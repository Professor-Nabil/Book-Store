// ./src/modules/book/view.route.ts
import express from "express";
import {
  readAllBooksService,
  createBookService,
  deleteBookService,
} from "./service.js";

const viewRoute = express.Router();

// 1. Render Initial Base Page
viewRoute.get("/", async (req, res, next) => {
  try {
    const books = await readAllBooksService();
    res.render("index", { books });
  } catch (err) {
    next(err);
  }
});

// 2. Process HTMX Creation and Return ONLY a Table Row Fragment
viewRoute.post("/books", async (req, res, next) => {
  try {
    const { title, author } = req.body;
    const newBook = await createBookService({ title, author });

    // Render only the row snippet to append into the running DOM tree layout
    res.render("book-row", { book: newBook });
  } catch (err) {
    next(err);
  }
});

// 3. Process HTMX Erasure and Return Nothing (200 OK with empty body removes the target)
viewRoute.delete("/books/:bookId", async (req, res, next) => {
  try {
    await deleteBookService(req.params.bookId);
    res.send(""); // HTMX swaps empty string into outerHTML, removing the row element perfectly
  } catch (err) {
    next(err);
  }
});

export default viewRoute;
