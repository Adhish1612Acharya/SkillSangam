import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { isLoggedIn } from "../middlewares/authmiddlewares.js";
import {
  addFamily,
  signup,
  login,
  failureLogin,
} from "../controllers/personnel.js";
import { validateBody } from "../middlewares/validation/validationMiddleware.js";
import { personnelSignupSchema } from "../middlewares/validation/validationSchema.js";
import passport from "passport";

const router = express.Router();

// Personnel Sign Up
router.post("/signup", validateBody(personnelSignupSchema), wrapAsync(signup));

// Personnel Login
router.post(
  "/login",
  passport.authenticate("personnel", {
    failureRedirect: "/api/auth/personnel/failureLogin",
  }),
  login // Do NOT wrap with wrapAsync, as login is synchronous and passport handles errors
);

// Personnel Failure Login
router.get("/failureLogin", failureLogin);

// PUT /addfamily
router.put("/addfamily", isLoggedIn, wrapAsync(addFamily));

export default router;
