// ./src/app.ts
import express from "express"; // FrontEnd and BackEnd

import { globalError } from "./errors/global.error.js"; // BackEnd
import bookRoute from "./modules/book/route.js"; // BackEnd

import path from "path"; // FrontEnd
import { fileURLToPath } from "url"; // FrontEnd
import viewRoute from "./modules/book/view.route.js"; // FrontEnd

const __filename = fileURLToPath(import.meta.url); // FrontEnd
const __dirname = path.dirname(__filename); // FrontEnd

const app = express(); // FrontEnd and BackEnd

app.use(express.json()); // BackEnd
app.use(express.urlencoded({ extended: true })); // FrontEnd

app.set("view engine", "ejs"); // FrontEnd
app.set("views", path.join(__dirname, "../views")); // FrontEnd

app.use("/views", viewRoute); // FrontEnd
app.use("/api/books", bookRoute); // BackEnd

app.use(globalError); // BackEnd

export default app; // FrontEnd and BackEnd
