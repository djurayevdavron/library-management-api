import express from "express";

import * as controller from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  controller.getUsers
);

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.getUserById
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.updateUser
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.deleteUser
);

export default router;