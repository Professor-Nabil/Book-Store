import type { Request, Response, NextFunction } from "express";
import { readAllBooksService, readOneBookService } from "./service.js";
import z from "zod";

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
    if (!result) throw new Error("Book not found");
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
