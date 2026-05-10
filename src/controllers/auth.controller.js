import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";


// REGISTER
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(409).json({
        statusCode: 409,
        message: "Bu email allaqachon ro'yxatdan o'tgan"
      });
    }

    const hash = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS) || 10
    );

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      fullName,
      email,
      passwordHash: hash,
      otpCode: otp,
      otpExpire: Date.now() + 5 * 60 * 1000
    });

    await sendEmail(
      email,
      "OTP Code",
      `Sizning tasdiqlash kodingiz: ${otp}`
    );

    const {
      passwordHash,
      otpCode,
      otpExpire,
      ...safeUser
    } = user._doc;

    res.status(201).json({
      statusCode: 201,
      data: safeUser,
      message:
        "Muvaffaqiyatli ro'yxatdan o'tdingiz. OTP ni tasdiqlang"
    });

  } catch (err) {
    next(err);
  }
};


// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "Foydalanuvchi topilmadi"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isMatch) {
      return res.status(400).json({
        statusCode: 400,
        message: "Parol noto'g'ri"
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        statusCode: 403,
        message: "Avval OTP orqali emailni tasdiqlang"
      });
    }

    // JWT TOKEN
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    const {
      passwordHash,
      otpCode,
      otpExpire,
      ...safeUser
    } = user._doc;

    res.json({
      statusCode: 200,
      data: safeUser,
      token,
      message: "Tizimga muvaffaqiyatli kirdingiz"
    });

  } catch (err) {
    next(err);
  }
};


// VERIFY OTP
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "Foydalanuvchi topilmadi"
      });
    }

    if (
      !user.otpCode ||
      user.otpExpire < Date.now()
    ) {
      return res.status(400).json({
        statusCode: 400,
        message: "OTP eskirgan"
      });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({
        statusCode: 400,
        message: "OTP noto'g'ri"
      });
    }

    user.isVerified = true;
    user.otpCode = null;
    user.otpExpire = null;

    await user.save();

    res.json({
      statusCode: 200,
      message: "Email tasdiqlandi"
    });

  } catch (err) {
    next(err);
  }
};