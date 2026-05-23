import express from "express";
import { readAllBooksController } from "./controller.js";

const route = express.Router();

route.get("/", readAllBooksController);

export default route;
