import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import type { BookSchema } from "../src/modules/book/schema.js";
import db from "../src/modules/book/repository.js";
import { faker } from "@faker-js/faker";
import app from "../src/app.js";

describe("### API ### DELETE '/api/books/bookId", () => {
  let realBook: BookSchema;
  beforeAll(async () => {
    realBook = await db.book.create({
      author: faker.book.author(),
      title: faker.book.title(),
    });
  });

  it("Should success delete one book", async () => {
    const res = await request(app).delete(`/api/books/${realBook.id}`);

    expect(res.status).toBe(204);
    expect(res.body).toStrictEqual({});
  });
});
