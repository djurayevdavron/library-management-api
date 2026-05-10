import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        statusCode: 401,
        message: "Token topilmadi"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(403).json({
        statusCode: 403,
        message: "User faol emas"
      });
    }

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({
      statusCode: 401,
      message: "Noto'g'ri token"
    });
  }
};