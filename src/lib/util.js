import jwt from "jsonwebtoken";

export const getUserIdFromToken = async (token) => {
  if (token) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decode?.issuer;
    return userId;
  }
  return null;
};
