import express from "express";
import passport from "passport";
import { login, failureLogin, logout } from "../controllers/admin.js";
import { validateBody } from "../middlewares/validation/validationMiddleware.js";
import { adminLoginSchema } from "../middlewares/validation/validationSchema.js";

const router = express.Router();

// Admin Login
router.post(
  "/login",
  validateBody(adminLoginSchema),
  passport.authenticate("admin", {
    failureRedirect: "/api/auth/admin/failureLogin",
  }),
  login
);

// Admin Failure Login
router.get("/failureLogin", failureLogin);

// Admin Logout
router.post("/logout", logout);

export default router;
