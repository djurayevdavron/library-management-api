import express from "express";
import * as controller from "../controllers/book.controller.js";
import validate from "../middlewares/validate.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { createBookSchema } from "../validators/book.validator.js";

const router = express.Router();

router.get("/", controller.getBooks);

router.get("/:id", controller.getBookById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createBookSchema),
  controller.createBook
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.updateBook
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.deleteBook
);

router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.updateBook
);

export default router;