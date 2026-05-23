import db from "./repository.js";

export const readAllBooksService = async () => {
  return await db.book.findAll();
};
