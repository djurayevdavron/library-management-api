import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


// GET ALL USERS
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-passwordHash");

    res.json({
      statusCode: 200,
      data: users
    });

  } catch (err) {
    next(err);
  }
};
// GET USER BY ID
export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Noto'g'ri ID"
      });
    }

    const user = await User.findById(id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User topilmadi"
      });
    }

    res.json({
      statusCode: 200,
      data: user
    });

  } catch (err) {
    next(err);
  }
};
// UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Noto'g'ri ID"
      });
    }

    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.passwordHash = await bcrypt.hash(
        updateData.password,
        10
      );

      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select("-passwordHash");
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User topilmadi"
      });
    }
    res.json({
      statusCode: 200,
      data: user,
      message: "User updated"
    });

  } catch (err) {
    next(err);
  }
};
// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Noto'g'ri ID"
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User topilmadi"
      });
    }

    res.json({
      statusCode: 200,
      message: "User deleted"
    });

  } catch (err) {
    next(err);
  }
};