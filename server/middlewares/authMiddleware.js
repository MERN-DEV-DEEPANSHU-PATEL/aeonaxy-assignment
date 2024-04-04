import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  console.log(req.cookies);
  console.log(req.cookie);
  console.log(req);
  if (!token)
    throw new UnauthenticatedError("authentication invalid Token not Found");

  try {
    const { userId } = verifyJWT(token);
    req.user = { userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
