import type { Request, Response, NextFunction } from "express";
import {
  createBookService,
  deleteBookService,
  readAllBooksService,
  readOneBookService,
  updateBookService,
} from "./service.js";
import z from "zod";
import { AppError } from "../../errors/app.error.js";
import { addBookSchema } from "./schema.js";

// =============================================================
export const readAllBooksController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // -------------------------------------------------------------
    const result = await readAllBooksService();
    // -------------------------------------------------------------
    const body = {
      message: "Success read all books",
      data: result,
    };
    // -------------------------------------------------------------
    res.status(200).json(body);
    // -------------------------------------------------------------
  } catch (err) {
    next(err);
  }
};

// =============================================================
export const readOneBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // -------------------------------------------------------------
    const bookId = z.uuid().parse(req.params.bookId);
    // -------------------------------------------------------------
    const result = await readOneBookService(bookId);
    // -------------------------------------------------------------
    if (!result) throw new AppError("Book not found", 404);
    // -------------------------------------------------------------
    const body = {
      message: "Success read one books",
      data: result,
    };
    // -------------------------------------------------------------
    res.status(200).json(body);
    // -------------------------------------------------------------
  } catch (err) {
    if (err instanceof z.ZodError) {
      err = new AppError("Invalid id", 400, err.issues);
      next(err);
    } else {
      next(err);
    }
  }
};

// =============================================================
export const createBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // -------------------------------------------------------------
    const book = addBookSchema.parse(req.body);
    // -------------------------------------------------------------
    const result = await createBookService(book);
    // -------------------------------------------------------------
    const body = {
      message: "Success create new books",
      data: result,
    };
    // -------------------------------------------------------------
    res.status(201).json(body);
    // -------------------------------------------------------------
  } catch (err) {
    if (err instanceof z.ZodError) {
      err = new AppError("Invalid book info", 400, err.issues);
      next(err);
    } else {
      next(err);
    }
  }
};

// =============================================================
export const updateBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // -------------------------------------------------------------
    const bookId = z.uuid().parse(req.params.bookId);
    const book = addBookSchema.parse(req.body);
    // -------------------------------------------------------------
    const result = await updateBookService(bookId, book);
    // -------------------------------------------------------------
    if (!result) {
      throw new AppError("Id not found", 404);
    }
    // -------------------------------------------------------------
    const body = {
      message: "Success update one book",
      data: result,
    };
    // -------------------------------------------------------------
    res.status(200).json(body);
    // -------------------------------------------------------------
  } catch (err) {
    if (err instanceof z.ZodError) {
      err = new AppError("Invalid book info of id", 400, err.issues);
      next(err);
    } else {
      next(err);
    }
  }
};

// =============================================================
export const deleteBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // -------------------------------------------------------------
    const bookId = z.uuid().parse(req.params.bookId);
    // -------------------------------------------------------------
    const result = await deleteBookService(bookId);
    // -------------------------------------------------------------
    if (!result) {
      throw new AppError("Id not found", 404);
    }
    // -------------------------------------------------------------
    // -------------------------------------------------------------
    res.sendStatus(204);
    // -------------------------------------------------------------
  } catch (err) {
    if (err instanceof z.ZodError) {
      err = new AppError("Invalid id", 400, err.issues);
      next(err);
    } else {
      next(err);
    }
  }
};
