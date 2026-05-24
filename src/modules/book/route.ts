import express from "express";
import {
  createBookController,
  readAllBooksController,
  readOneBooksController,
} from "./controller.js";

const route = express.Router();

route.get("/", readAllBooksController);

route.get("/:bookId", readOneBooksController);

route.post("/", createBookController);

export default route;
