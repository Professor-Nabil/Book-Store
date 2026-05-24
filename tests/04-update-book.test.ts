import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import db from "../src/modules/book/repository.js";
import { faker } from "@faker-js/faker";
import type { BookSchema } from "../src/modules/book/schema.js";
import app from "../src/app.js";

describe("### API ### PUT '/api/books'", () => {
  let oldBook: BookSchema;
  beforeAll(async () => {
    oldBook = await db.book.create({
      author: faker.book.author(),
      title: faker.book.title(),
    });
  });
  it("Should success update book", async () => {
    const newBook = {
      author: faker.book.author(),
      title: faker.book.title(),
    };
    const res = await request(app)
      .put(`/api/books/${oldBook.id}`)
      .send(newBook);

    // -------------------------------------------------------------
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    // -------------------------------------------------------------
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.id).toBe(oldBook.id);
    // -------------------------------------------------------------
    expect(res.body.data).toHaveProperty("author");
    expect(res.body.data.author).toBe(newBook.author);
    expect(res.body.data.author).not.toBe(oldBook.author);
    // -------------------------------------------------------------
    expect(res.body.data).toHaveProperty("title");
    expect(res.body.data.title).toBe(newBook.title);
    expect(res.body.data.title).not.toBe(oldBook.title);
  });
});
