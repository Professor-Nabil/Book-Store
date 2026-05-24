# Step 1: Update your Express App Config

```typescript
// ./src/app.ts
import express from "express";
import bookRoute from "./modules/book/route.js";
import { globalError } from "./errors/global.error.js";

const app = express();
app.use(express.json());

// CRITICAL: Serve raw UI files directly out of a root directory named 'public'
app.use(express.static("public"));

app.use("/api/books", bookRoute);

app.use(globalError);

export default app;
```

---

## Step 2: Create Your Optimized Alpine Component (With Full Neovim LSP Support)

```javascript
// ./public/app.js
document.addEventListener("alpine:init", () => {
  Alpine.data("apiTestBench", () => ({
    // 1. Reactive Frontend Arrays & Input States
    books: [],
    newTitle: "",
    newAuthor: "",
    editingBookId: null,
    editTitle: "",
    editAuthor: "",

    // 2. Lifecycle Hook: Runs automatically when the component mounts
    init() {
      this.getAllBooks();
    },

    // 3. GET /api/books (Read All)
    async getAllBooks() {
      try {
        const response = await fetch("/api/books");
        const result = await response.json();
        this.books = result.data;
      } catch (err) {
        console.error("Failed to load books:", err);
      }
    },

    // 4. POST /api/books (Create One)
    async createBook() {
      try {
        const response = await fetch("/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.newTitle,
            author: this.newAuthor,
          }),
        });

        if (response.status === 201) {
          // Clear fields and re-fetch clean list state
          this.newTitle = "";
          this.newAuthor = "";
          this.getAllBooks();
        } else {
          const errorData = await response.json();
          alert(`Error ${response.status}: ${errorData.message}`);
        }
      } catch (err) {
        console.error("Error creating book:", err);
      }
    },

    // 5. DELETE /api/books/:bookId (Delete One)
    async deleteBook(id) {
      try {
        const response = await fetch(`/api/books/${id}`, {
          method: "DELETE",
        });
        // Your controller sends status 204 on success
        if (response.status === 204) {
          this.getAllBooks();
        } else {
          alert("Could not delete book layout.");
        }
      } catch (err) {
        console.error("Error deleting book:", err);
      }
    },

    // 6. Inline Edit Form Helpers
    startEdit(book) {
      this.editingBookId = book.id;
      this.editTitle = book.title;
      this.editAuthor = book.author;
    },

    cancelEdit() {
      this.editingBookId = null;
    },

    // 7. PUT /api/books/:bookId (Update One)
    async updateBook(id) {
      try {
        const response = await fetch(`/api/books/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.editTitle,
            author: this.editAuthor,
          }),
        });

        if (response.status === 200) {
          this.editingBookId = null;
          this.getAllBooks();
        } else {
          const errorData = await response.json();
          alert(`Update failed: ${errorData.message}`);
        }
      } catch (err) {
        console.error("Error updating book:", err);
      }
    },
  }));
});
```

---

## Step 3: Build Your Clean, Semantic HTML Template

```html
<!-- ./public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Book Store Live API Testbench</title>
    <script src="/app.js" defer></script>
    <script
      defer
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </head>
  <body x-data="apiTestBench">
    <h1>📚 API Live Verification Sandbox</h1>
    <p>
      Interacting directly with real JSON endpoints under
      <code>/api/books</code>
    </p>
    <hr />

    <h3>Endpoint: <code>POST /api/books</code></h3>
    <form @submit.prevent="createBook()">
      <input
        type="text"
        x-model="newTitle"
        placeholder="Enter Book Title"
        required
      />
      <input
        type="text"
        x-model="newAuthor"
        placeholder="Enter Author Name"
        required
      />
      <button type="submit">Submit Creation</button>
    </form>

    <hr />

    <h3>Endpoint Inventory: <code>GET /api/books</code></h3>
    <button @click="getAllBooks()">Manual Refresh Trigger</button>

    <br /><br />

    <table border="1" cellpadding="8">
      <thead>
        <tr>
          <th>UUID Identifier</th>
          <th>Book Title</th>
          <th>Author</th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        <template x-for="book in books" :key="book.id">
          <tr>
            <td
              x-text="book.id"
              style="font-family: monospace; font-size: 0.85em;"
            ></td>

            <td>
              <template x-if="editingBookId !== book.id">
                <span x-text="book.title" style="font-weight: bold;"></span>
              </template>
              <template x-if="editingBookId === book.id">
                <input type="text" x-model="editTitle" />
              </template>
            </td>

            <td>
              <template x-if="editingBookId !== book.id">
                <span x-text="book.author"></span>
              </template>
              <template x-if="editingBookId === book.id">
                <input type="text" x-model="editAuthor" />
              </template>
            </td>

            <td>
              <template x-if="editingBookId !== book.id">
                <div>
                  <button @click="startEdit(book)">Edit</button>
                  <button @click="deleteBook(book.id)">Delete</button>
                </div>
              </template>

              <template x-if="editingBookId === book.id">
                <div>
                  <button @click="updateBook(book.id)">Save</button>
                  <button @click="cancelEdit()">Cancel</button>
                </div>
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <template x-if="books.length === 0">
      <p>No books currently active in system runtime memory array cache.</p>
    </template>
  </body>
</html>
```

---
