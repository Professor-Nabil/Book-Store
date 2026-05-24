import db from "./repository.js";
import type { AddBookSchema } from "./schema.js";

// =============================================================
export const readAllBooksService = async () => {
  return await db.book.findAll();
};

// =============================================================
export const readOneBookService = async (id: string) => {
  return await db.book.find(id);
};

// =============================================================
export const createBookService = async (book: AddBookSchema) => {
  return await db.book.create(book);
};
