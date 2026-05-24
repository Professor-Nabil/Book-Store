# The 2 Directives You Need for Lesson 3

1. **`x-show`**:
   Takes a boolean condition (like `true` or `false`).
   If `false`, it adds `display: none`
   to the HTML element to hide it from the screen.

2. **`x-for`**:
   Loops through an array and prints HTML elements dynamically.
   > [!NOTE]
   > Because of how Alpine's engine operates under the hood,
   > `x-for` **must** be written on an HTML `<template>` tag,
   > and it requires a unique `:key` attribute to keep track of items safely.

---

### Step 1: Update Your External JavaScript Data Layer

Let's modify your **`public/app.js`** file to hold a hardcoded
local array list of books and an active toggle visibility switch.

```javascript
// ./public/app.js
document.addEventListener("alpine:init", () => {
  Alpine.data("bookComponent", () => ({
    // 1. Array state storage simulating your database layer
    books: [
      { id: 1, title: "Clean Code", author: "Robert C. Martin" },
      { id: 2, title: "Refactoring", author: "Martin Fowler" },
      { id: 3, title: "You Dont Know JS", author: "Kyle Simpson" },
    ],

    // 2. UI tracking boolean state variable
    showInventory: true,

    // 3. Simple action methods
    toggleInventory() {
      this.showInventory = !this.showInventory;
    },

    clearAllBooks() {
      this.books = []; // Empty the list array state memory box
    },
  }));
});
```

---

### Step 2: Build the Conditional Loop Layout

Now, update your **`public/index.html`** file
to handle conditional rendering and mapping structures.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Alpine.js Lesson 3</title>
    <script src="/app.js" defer></script>
    <script
      defer
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </head>
  <body x-data="bookComponent">
    <h1>Alpine.js Lesson 3: Loops & Conditionals</h1>
    <hr />

    <button @click="toggleInventory()">
      <span
        x-text="showInventory ? 'Hide Inventory Section' : 'Show Inventory Section'"
      ></span>
    </button>
    <button @click="clearAllBooks()">Clear Entire Array</button>

    <br /><br />

    <div x-show="showInventory" style="border: 1px solid black; padding: 15px;">
      <h3>Active Bookstore Inventory</h3>

      <p x-show="books.length === 0">No books found in memory right now.</p>

      <table border="1" cellpadding="5" x-show="books.length > 0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <template x-for="book in books" :key="book.id">
            <tr>
              <td x-text="book.title" style="font-weight: bold;"></td>
              <td x-text="book.author"></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </body>
</html>
```

---
