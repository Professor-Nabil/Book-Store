// =============================================================
// Create 10 books at the start of the server
// =============================================================
import db from "../modules/book/repository.js";
import { faker } from "@faker-js/faker";

for (let i = 0; i < 10; i++) {
  await db.book.create({
    author: faker.book.author(),
    title: faker.book.title(),
  });
}
