# **Lesson 1 of Alpine.js!**

---

## The Core Concept of Alpine.js

In standard HTML, elements are completely static.
They don't remember things.
If you type into an input box,
the rest of the page doesn't automatically know what you typed.

Alpine.js gives HTML an internal **State** (memory) right inside your tags.
You do this using special attributes that start with `x-`.

---

### The 3 Core Directives for Lesson 1

| Directive     | What it does                                                         | Think of it as...             |
| ------------- | -------------------------------------------------------------------- | ----------------------------- |
| **`x-data`**  | Defines a chunk of memory (variables/functions) for an HTML element. | Initializing local variables. |
| **`x-text`**  | Updates an element's text dynamically based on a variable.           | Printing a variable.          |
| **`x-model`** | Binds an input box directly to an Alpine variable in real-time.      | A two-way live link.          |

---

### Step 1: Create Your Sandbox File

Let's build a clean, structural testing ground. Create a file called `public/lesson1.html` (or modify your `index.html`) and paste this completely raw, zero-CSS example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Alpine.js Lesson 1</title>
    <script
      defer
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </head>
  <body>
    <h1>Alpine.js Lesson 1: State & Inputs</h1>
    <hr />

    <div
      x-data="{ 
        username: 'Nabil',
        currentBook: 'The Pragmatic Programmer' 
    }"
    >
      <h3>Welcome back, <span x-text="username"></span>!</h3>

      <p>
        You are currently reading:
        <strong x-text="currentBook"></strong>
      </p>

      <hr />

      <h3>Try Editing the State Live:</h3>

      <label for="change-name">Change Username:</label>
      <input id="change-name" type="text" x-model="username" />

      <br /><br />

      <label for="change-book">Change Book Title:</label>
      <input id="change-book" type="text" x-model="currentBook" />
    </div>
  </body>
</html>
```

---
