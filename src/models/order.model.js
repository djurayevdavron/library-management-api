import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  quantity: Number,
  totalPrice: Number,
  status: {
    type: String,
    enum: ["PENDING", "DELIVERED", "CANCELLED"],
    default: "PENDING"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);