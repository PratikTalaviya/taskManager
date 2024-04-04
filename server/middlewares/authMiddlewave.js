import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    // let token = req.cookies?.token;
    const authHeader = req.headers["authorization"];
    let token = "";
    if (authHeader) {
      token = authHeader.split(" ")[1];
    }

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        userId: decodedToken.userId,
      };

      next();
    } else {
      return res.status(401).json({ status: false, message: "Not authorized. Try login again." });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ status: false, message: "Not authorized. Try login again." });
  }
};

export { protectRoute };
