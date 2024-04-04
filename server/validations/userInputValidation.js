import { body, query } from "express-validator";
import { withValidationErrors } from "./allErrorMessages.js";
import { BadRequestError } from "../errors/customErrors.js";
import UserModel from "../models/userModel.js";

export const validateRegisterInput = withValidationErrors([
  body("fullName")
    .notEmpty()
    .withMessage("Name can not be Empty")
    .isLength({ max: 50 })
    .withMessage("Name is too long")
    .isLength({ min: 3 })
    .withMessage("Name is too Short"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isLength({ max: 200 })
    .withMessage("Email is too long")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ max: 200 })
    .withMessage("username is too long")
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (user) {
        throw new BadRequestError("username already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ max: 200 })
    .withMessage("password is too long")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Please enter your email")
    .isLength({ max: 100 })
    .withMessage("Email is too long")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("location").isLength({ max: 100 }).withMessage("location is too log"),
]);

export const validateDeleteUserQuery = withValidationErrors([
  query("email")
    .notEmpty()
    .withMessage("email is required")
    .isLength({ max: 100 })
    .withMessage("Email is too long")
    .isEmail()
    .withMessage("invalid email format"),
  query("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ max: 200 })
    .withMessage("password is too long")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
]);

//PASSWORD UPADATE FEATURE NOT ADDED FOR FUTURE VALIDATIONS
// body("password")
// .notEmpty()
// .withMessage("password is required")
// .isLength({max:200}).withMessage("password is too long")
// .isLength({ min: 6 })
// .withMessage("password must be at least 6 characters long"),
