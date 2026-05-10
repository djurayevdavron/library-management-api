import Order from "../models/order.model.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
   const { bookId, quantity } = req.body;

    const userId = req.user.userId;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(bookId)
    ) {
      return res.status(400).json({
        statusCode: 400,
        message: "Noto'g'ri ID"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "Foydalanuvchi topilmadi"
      });
    }
    if (!user.isVerified) {
   return res.status(403).json({
    statusCode: 403,
    message: "Avval emailni tasdiqlang"
  });
  }

    const existing = await Order.findOne({
      userId,
      bookId,
      status: "PENDING"
    });

    if (existing) {
      return res.status(409).json({
        statusCode: 409,
        message: "Siz bu kitobni allaqachon buyurtma qilgansiz"
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: "Kitob topilmadi"
      });
    }

    if (book.stock < quantity) {
      return res.status(400).json({
        statusCode: 400,
        message: `Kitob yetarli emas, mavjud: ${book.stock} ta`
      });
    }

    book.stock -= quantity;
    await book.save();

    const totalPrice = book.price * quantity;

    const order = await Order.create({
      userId,
      bookId,
      quantity,
      totalPrice
    });

    res.status(201).json({
      statusCode: 201,
      data: order,
      message: "Buyurtma muvaffaqiyatli yaratildi"
    });

  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("userId", "-passwordHash")
      .populate("bookId");

    res.json({
      statusCode: 200,
      data: orders
    });

  } catch (err) {
    next(err);
  }
};

// GET USER ORDERS
export const getUserOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Noto'g'ri ID"
      });
    }

    const orders = await Order.find({ userId })
      .populate("userId", "-passwordHash")
      .populate("bookId");

    res.json({
      statusCode: 200,
      data: orders
    });

  } catch (err) {
    next(err);
  }
};

// CANCEL
export const cancelOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Noto'g'ri ID"
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: "Buyurtma topilmadi"
      });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({
        statusCode: 400,
        message: "Faqat PENDING buyurtma bekor qilinadi"
      });
    }

    const book = await Book.findById(order.bookId);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: "Kitob topilmadi"
      });
    }

    book.stock += order.quantity;
    await book.save();

    order.status = "CANCELLED";
    await order.save();

    res.json({
      statusCode: 200,
      data: order,
      message: "Buyurtma bekor qilindi"
    });

  } catch (err) {
    next(err);
  }
};
// UPDATE ORDER
export const updateOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ID"
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: "Order topilmadi"
      });
    }

    res.json({
      statusCode: 200,
      data: order,
      message: "Order updated"
    });

  } catch (err) {
    next(err);
  }
};


// DELETE ORDER
export const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ID"
      });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: "Order topilmadi"
      });
    }

    res.json({
      statusCode: 200,
      message: "Order deleted"
    });

  } catch (err) {
    next(err);
  }
};