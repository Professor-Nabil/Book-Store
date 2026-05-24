import { beforeAll, describe, expect, it } from "vitest";
import db from "../src/modules/book/repository.js";
import { faker } from "@faker-js/faker";
import type { BookSchema } from "../src/modules/book/schema.js";
import request from "supertest";
import app from "../src/app.js";

describe("### API ### GET '/api/books/:bookId'", () => {
  let realBook: BookSchema;

  beforeAll(async () => {
    realBook = await db.book.create({
      author: faker.book.author(),
      title: faker.book.title(),
    });
  });

  it("Should success read one book", async () => {
    const res = await request(app).get(`/api/books/${realBook.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.id).toBe(realBook.id);
  });
});
