import jwt from "jsonwebtoken";


const generateToken = (res, userId) => {

  //create a jwt token
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });

  //set jwt as htp only cookie
  res.cookie("jwt", token, {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return token;
};

export default generateToken;
