import db from "./repository.js";

// =============================================================
export const readAllBooksService = async () => {
  return await db.book.findAll();
};

// =============================================================
export const readOneBookService = async (id: string) => {
  return await db.book.find(id);
};
