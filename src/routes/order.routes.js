import express from "express";
import * as controller from "../controllers/order.controller.js";
import validate from "../middlewares/validate.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { createOrderSchema } from "../validators/order.validator.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(createOrderSchema),
  controller.createOrder
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  controller.getAllOrders
);

router.get(
  "/my/:userId",
  authMiddleware,
  controller.getUserOrders
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  controller.cancelOrder
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.updateOrder
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.deleteOrder
);

export default router;