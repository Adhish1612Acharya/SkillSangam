// import { config as dotEnvConfig } from "dotenv";
// if (process.env.NODE_ENV !== "production") {
//   dotEnvConfig();
// }
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import bodyParser from "body-parser";
import errorHandler from "./utils/errorHandler.js";
// import { Server } from 'socket.io';
import http from "http";
import { Server } from "socket.io";
import initSocket from "./socket.js";
import { Strategy as localStrategy } from "passport-local";
import passport from "passport";
import MongoStore from "connect-mongo";
import Admin from "./models/Admin.js";

import Family from "./models/Family.js";
import Officer from "./models/Officer.js";
import Personnel from "./models/Personnel.js";
import familyRoutes from "./routes/family.js";
import adminRoutes from "./routes/admin.js";
import officerRoutes from "./routes/officer.js";
// dotenv.config();
const app = express();
//socket connection
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// Initialize Socket.IO
// initSocket(io);
main()
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("DB connect error");
    console.log(err.message);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/skillsangam");
}

const store = MongoStore.create({
  mongoUrl: "mongodb://127.0.0.1:27017/ayurpath",
  crypto: {
    secret: process.env.SECRET || "My secret code",
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error occurred in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET || "MySecretKey",
  resave: false,
  saveUninitialized: false, // ⬅️ Ensure only authenticated sessions are stored
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ False for local dev
    sameSite: "lax", // ✅ Prevents cross-origin issues
  },
};
// const server = http.createServer(app);
// const io = new Server(server);

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

// LocalStrategy for Admin
passport.use("admin", new localStrategy(Admin.authenticate()));
// LocalStrategy for Officer
passport.use("officer", new localStrategy(Officer.authenticate()));
// LocalStrategy for Family
passport.use("family", new localStrategy(Family.authenticate()));
// LocalStrategy for Personnel
passport.use("personnel", new localStrategy(Personnel.authenticate()));

passport.serializeUser((entity, done) => {
  done(null, { id: entity._id, type: entity.role });
});

passport.deserializeUser((obj, done) => {
  switch (obj.type) {
    case "admin":
      Admin.findById(obj.id).then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(new Error("Admin id not found: " + obj.id));
        }
      });
      break;
    case "officer":
      Officer.findById(obj.id).then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(new Error("Officer id not found: " + obj.id));
        }
      });
      break;
    case "family":
      Family.findById(obj.id).then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(new Error("Family id not found: " + obj.id));
        }
      });
      break;
    case "personnel":
      Personnel.findById(obj.id).then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(new Error("Family id not found: " + obj.id));
        }
      });
      break;
    default:
      done(new Error("No entity type: " + obj.type));
      break;
  }
});

app.get("/api/auth/check", (req, res) => {
  const loggedIn = req.isAuthenticated();
  const userRole = req.user?.role || null;

  res.status(200).json({
    success: true,
    message: "Auth Status",
    loggedIn,
    userRole,
  });
});

app.get("/api/user/data", (req, res) => {
  res.status(200).json({
    userEmail: req.user.email,
  });
});

app.use("/api/auth/family", familyRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/auth/officer", officerRoutes);

// -------------------Deployment------------------//

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "local") {
  app.use(express.static(path.join(__dirname1, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname1, "../", "frontend", "dist", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.json("Success");
  });
}

// -------------------Deployment------------------//

// app.get("/login", (req, res) => {
//   const buildPath = path.join(__dirname1, "../frontend/dist");
//   res.sendFile(path.join(buildPath, "index.html"));
// });

app.use(errorHandler);

const port = process.env.PORT || 3000;

// io.on('connection', (socket) => {

//   console.log(`Connected: ${socket.user._id}`);

//   //socket.on('joinRoom', (roomId) => socket.join(roomId));

//   socket.on('disconnect', () => console.log(`Disconnected: ${socket.user._id}`));

// });
// 404 handler

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Generic error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log("Server listening on port: ", port);
});

//SOCKET CONNECTION

// // Start the server
// server.listen(8080, () => console.log("Server running on http://localhost:8080"));
