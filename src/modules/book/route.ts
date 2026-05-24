import express from "express";
import {
  createBookController,
  readAllBooksController,
  readOneBooksController,
  updateBookController,
} from "./controller.js";

const route = express.Router();

route.get("/", readAllBooksController);

route.get("/:bookId", readOneBooksController);

route.post("/", createBookController);

route.put("/:bookId", updateBookController);

export default route;
