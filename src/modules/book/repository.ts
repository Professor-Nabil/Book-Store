// =============================================================
// find all books || empty array []
// =============================================================
// Find onw book by id || null
// =============================================================
// Create one book
// =============================================================
// Update one book || null
// =============================================================
// Delete one book || null
// =============================================================
import { type BookSchema, type AddBookSchema } from "./schema.js";
import { v4 as uuidv4 } from "uuid";

let Books: BookSchema[] = [];

const db = {
  book: {
    // =============================================================
    // find all books || empty array []
    findAll: async () => {
      return Books;
    },
    // =============================================================
    // Find onw book by id || null
    find: async (id: string) => {
      const book = Books.find((elm) => elm.id === id);
      if (book) {
        return book;
      } else {
        return null;
      }
    },
    // =============================================================
    // Create one book
    create: async (book: AddBookSchema) => {
      const newBook: BookSchema = {
        id: uuidv4(),
        author: book.author,
        title: book.title,
      };
      Books.push(newBook);
      return newBook;
    },
    // =============================================================
    // Update one book || null
    update: async (id: string, book: AddBookSchema) => {
      let updatedBook;

      Books = Books.map((elm) => {
        if (elm.id === id) {
          updatedBook = {
            id: elm.id,
            author: book.author || elm.author,
            title: book.title || elm.title,
          };
          return updatedBook;
        } else {
          return elm;
        }
      });

      if (updatedBook) {
        return updatedBook;
      }
      return null;
    },
    // =============================================================
    // Delete one book || null
    delete: async (id: string) => {
      let deletedBook;
      Books = Books.filter((elm) => {
        if (elm.id !== id) {
          return elm;
        } else {
          deletedBook = elm;
        }
      });

      if (deletedBook) {
        return deletedBook;
      }
      return null;
    },
    // =============================================================
  },
};

export default db;
