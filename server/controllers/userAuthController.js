import { StatusCodes } from "http-status-codes";
import UserModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import {
  BadRequestError,
  InternalServerError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import { uploadImageToCDN } from "../utils/cloudinary.js";
import { sendOtp, verifyOtp } from "../utils/otp.js";
const oneDay = 1000 * 60 * 60 * 24;

export const Register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await UserModel.create(req.body);
  const token = createJWT({ userId: user._id });
  console.log(process.env.NODE_ENV === "production");
  res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: true,
      sameSite: "none",
    })
    .status(StatusCodes.CREATED)
    .json({ msg: "Register Successful" });
};

export const UpdateUser = async (req, res) => {
  try {
    if (!req.file && !req.body?.isDefaultImg) {
      return res.status(422).json({ msg: "Please Select an image" });
    }
    const user = await UserModel.findById(req.user.userId);
    if (req.body?.isDefaultImg !== "true") {
      const image = await uploadImageToCDN(req.file);
      user.imageUrl = image.url;
    }
    user.location = req.body.location;
    user.save();
    sendOtp(user.email);
    res.status(StatusCodes.CREATED).json({ msg: "Profile Updated" });
  } catch (error) {
    console.log("from up", error);
  }
};

export const Login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email not found please register first" });
  }
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id });

  console.log(process.env.NODE_ENV === "production");
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: true,
    sameSite: "none",
  });
  res.status(StatusCodes.OK).json({ msg: "Login Successful" });
};

export const Logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: true,
    sameSite: "none",
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export const getUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user.userId });
  if (!user) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Your Account maybe delete or something went wrong" });
  } else {
    user.password = null;
    user._id = null;
    return res.status(StatusCodes.OK).json({ user });
  }
};

export const VerifyUserSendOtp = async (req, res) => {
  const user = await UserModel.findById(req.user.userId);
  const status = await sendOtp(user.email);
  if (status.isSuccess) {
    return res.status(StatusCodes.OK).json({ msg: status.msg });
  } else {
    console.log("not send otp");
    throw InternalServerError(status.msg);
  }
};
export const VerifyUserVerifyOtp = async (req, res) => {
  const user = await UserModel.findOne({ email: req.query.email });
  if (!user) {
    throw new BadRequestError("User not exits");
  }
  const status = await verifyOtp(req.query.otp, user.email);
  if (status.isVerify) {
    user.isVerifyed = true;
    await user.save();
    return res.status(StatusCodes.OK)
      .send(`<div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center" ><div style="background-color: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.9); text-align: center;">
      <h1 style="color: #333; margin-bottom: 20px;font-size: 5vw;">Email Verified!</h1>
      <p style="color: #666; line-height: 1.5; margin-bottom: 30px;">Thank you for verifying your email address. Your account is now active, and you can start exploring Dribbble.</p>
      <a href=${process.env.CLIENT_URL} class="btn-start" style="display: inline-block; background-color: #e73655; color: #fff; text-decoration: none;padding: 4vw 7vw;
      font-size: 4vw; border-radius: 4px; transition: background-color 0.3s ease;">Get Started</a>
    </div></div>`);
  } else {
    console.log("not verify otp");
    throw new InternalServerError(status.msg);
  }
};
