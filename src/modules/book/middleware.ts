import type { Request, Response, NextFunction } from "express";
import z from "zod";
import { AppError } from "../../errors/app.error.js";
import { addBookSchema } from "./schema.js";

export const validUuidMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = z.uuid().parse(req.params.bookId);
    req.params.bookId = bookId;
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      err = new AppError("Invalid id", 400, err.issues);
      next(err);
    } else {
      next(err);
    }
  }
};

export const validBookMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const book = addBookSchema.parse(req.body);
    req.body = book;
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      err = new AppError("Invalid book info", 400, err.issues);
      next(err);
    } else {
      next(err);
    }
  }
};
