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

export const readAllBooksController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await readAllBooksService();
    console.log(result);
    res.status(200).json({
      message: "Success read all books",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const readOneBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = z.uuid().parse(req.params.bookId);
    const result = await readOneBookService(bookId);
    if (!result) throw new AppError("Book not found", 404);
    res.status(200).json({
      message: "Success read one books",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const createBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await createBookService(req.body);
    res.status(201).json({
      message: "Success create new books",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = z.uuid().parse(req.params.bookId);
    const result = await updateBookService(bookId, req.body);
    if (!result) throw new AppError("Id not found", 404);
    res.status(200).json({
      message: "Success update one book",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBookController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = z.uuid().parse(req.params.bookId);
    const result = await deleteBookService(bookId);
    if (!result) throw new AppError("Id not found", 404);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
