// ./src/app.ts
import "./lib/seed.books.js";
import express from "express";
import bookRoute from "./modules/book/route.js";

const app = express();
app.use(express.json());

app.use("/api/books", bookRoute);

export default app;
