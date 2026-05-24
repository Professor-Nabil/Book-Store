import express from "express";
import {
  readAllBooksController,
  readOneBooksController,
} from "./controller.js";

const route = express.Router();

route.get("/", readAllBooksController);

route.get("/:bookId", readOneBooksController);

export default route;
