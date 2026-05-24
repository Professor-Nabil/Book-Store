import express from "express";
import {
  createBookController,
  deleteBookController,
  readAllBooksController,
  readOneBooksController,
  updateBookController,
} from "./controller.js";
import { validBookMiddleware, validUuidMiddleware } from "./middleware.js";

const route = express.Router();

route.get("/", readAllBooksController);

route.get("/:bookId", validUuidMiddleware, readOneBooksController);

route.post("/", validBookMiddleware, createBookController);

route.put(
  "/:bookId",
  validUuidMiddleware,
  validBookMiddleware,
  updateBookController,
);

route.delete("/:bookId", validUuidMiddleware, deleteBookController);

export default route;
