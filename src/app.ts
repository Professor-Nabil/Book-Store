// ./src/app.ts
import express from "express";
import bookRoute from "./modules/book/route.js";
import { globalError } from "./errors/global.error.js";

const app = express();
app.use(express.json());

app.use("/api/books", bookRoute);

app.use(globalError);

export default app;
