import type { Request, Response, NextFunction } from "express";
import { readAllBooksService } from "./service.js";

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
