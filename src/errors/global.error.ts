import type { Request, Response, NextFunction } from "express";

export const globalError = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // -------------------------------------------------------------
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // -------------------------------------------------------------
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    errors: err.errors,
  });
  // -------------------------------------------------------------
};
