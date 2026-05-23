import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("### API ### GET '/api/books'", () => {
  it("Should read all books", async () => {
    const res = await request(app).get("/api/books");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
  });
});
