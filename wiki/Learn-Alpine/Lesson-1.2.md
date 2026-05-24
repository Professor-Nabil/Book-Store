# Write javascript in another file

---

### Step 1: Create the External Script File

Create a new file named **`public/app.js`**.

Because this is a pure JavaScript file,
your editor will give you full autocompletion,
syntax highlighting, and linting checks!

```javascript
// ./public/app.js

// We register a component named 'bookComponent'
document.addEventListener("alpine:init", () => {
  Alpine.data("bookComponent", () => ({
    // 1. Local State Variables
    username: "Nabil",
    currentBook: "The Pragmatic Programmer",

    // 2. Action Functions (We will use these in Lesson 2)
    changeUser(newName) {
      this.username = newName;
    },

    resetBook() {
      this.currentBook = "";
    },
  }));
});
```

---

### Step 2: Clean Up Your HTML File

Now, open your **`public/index.html`** file.

You pull in your `app.js` script file using a standard script tag.
Then, inside your HTML container,
you simply pass the string name of your component
(`'bookComponent'`) straight into **`x-data`**.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Alpine.js External Logic Sandbox</title>

    <script src="/app.js" defer></script>

    <script
      defer
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </head>
  <body>
    <h1>Alpine.js: External Logic Structure</h1>
    <hr />

    <div x-data="bookComponent">
      <h3>Welcome back, <span x-text="username"></span>!</h3>
      <p>You are reading: <strong x-text="currentBook"></strong></p>

      <hr />

      <label for="username-input">Edit Username:</label>
      <input id="username-input" type="text" x-model="username" />

      <br /><br />

      <label for="book-input">Edit Book:</label>
      <input id="book-input" type="text" x-model="currentBook" />
    </div>
  </body>
</html>
```

---
