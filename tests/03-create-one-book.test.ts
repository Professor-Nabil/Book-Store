import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { faker } from "@faker-js/faker";

describe("### API ### POST '/api/books'", () => {
  it("Should success create new book", async () => {
    const res = await request(app).post("/api/books").send({
      author: faker.book.author(),
      title: faker.book.title(),
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("author");
    expect(res.body.data).toHaveProperty("title");
  });

  it("Should failed if missing author or title", async () => {
    await request(app)
      .post("/api/books")
      .send({
        author: faker.book.author(),
      })
      .expect(400);

    await request(app)
      .post("/api/books")
      .send({
        title: faker.book.title(),
      })
      .expect(400);
  });
});
