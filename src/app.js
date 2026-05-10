import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import orderRoutes from "./routes/order.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);


// ROOT ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Book Store API ishlayapti"
  });
});


// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK"
  });
});
// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

// ERROR HANDLER
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
// DB CONNECT
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB ERROR:", err);
  });
