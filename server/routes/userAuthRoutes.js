import {
  Login,
  Logout,
  Register,
  UpdateUser,
  VerifyUserSendOtp,
  VerifyUserVerifyOtp,
  getUser,
} from "../controllers/userAuthController.js";
// Input Validation for data that user send
import {
  validateLoginInput,
  validateRegisterInput,
  validateUpdateUserInput,
} from "../validations/userInputValidation.js";

import express from "express";
import apiLimiter from "../utils/rateLimiter.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import multer from "multer";

const userAuthRouter = express.Router();
const upload = multer({ dest: "uploads/" });

userAuthRouter.post("/register", validateRegisterInput, Register);
userAuthRouter.post("/login", validateLoginInput, Login);
userAuthRouter.put(
  "/update",
  validateUpdateUserInput,
  authenticateUser,
  upload.single("image"),
  UpdateUser
);
userAuthRouter.get("/logout", Logout);
userAuthRouter.get("/getotp", authenticateUser, VerifyUserSendOtp);
userAuthRouter.get("/verifymail", VerifyUserVerifyOtp);
userAuthRouter.get("/", authenticateUser, getUser);

export default userAuthRouter;
