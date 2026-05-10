import Book from "../models/book.model.js";
import mongoose from "mongoose";

// GET ALL
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    res.json({
      statusCode: 200,
      data: books
    });

  } catch (err) {
    next(err);
  }
};

// GET ONE
export const getBookById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Noto'g'ri ID"
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: "Kitob topilmadi"
      });
    }

    res.json({
      statusCode: 200,
      data: book
    });

  } catch (err) {
    next(err);
  }
};

// CREATE
export const createBook = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Body bo'sh bo'lmasligi kerak"
      });
    }

    const book = await Book.create(req.body);

    res.status(201).json({
      statusCode: 201,
      data: book
    });

  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateBook = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Noto'g'ri ID"
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Body bo'sh bo'lmasligi kerak"
      });
    }

    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: "Kitob topilmadi"
      });
    }

    res.json({
      statusCode: 200,
      data: book
    });

  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteBook = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Noto'g'ri ID"
      });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: "Kitob topilmadi"
      });
    }

    res.json({
      statusCode: 200,
      message: "O'chirildi"
    });

  } catch (err) {
    next(err);
  }
};