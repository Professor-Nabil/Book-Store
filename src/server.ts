// ./src/server.ts
import "./lib/seeds/seed.3.books.js";
import app from "./app.js";

const PORT = 3000;
app.listen(PORT, () => console.log(`Server Start ${PORT}`));
