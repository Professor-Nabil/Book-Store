# The Alpine Events Directive: `x-on` (or `@`)

- `x-on:click="..."` becomes **`@click="..."`**
- `x-on:submit="..."` becomes **`@submit="..."`**

When an event fires,
Alpine will run the corresponding function inside your external script file.

---

### Step 1: Update Your External JavaScript Logic

Let's modify **`public/app.js`** to add functions
that can mutate our state values or log information when actions happen.

```javascript
// ./public/app.js
document.addEventListener("alpine:init", () => {
  Alpine.data("bookComponent", () => ({
    // Our Reactive State
    username: "Nabil",
    currentBook: "The Pragmatic Programmer",

    // Action Function 1: Clears the input field memory
    clearBook() {
      this.currentBook = "";
    },

    // Action Function 2: Say Hello via terminal console log
    logGreeting() {
      console.log(`Hello from the browser console, ${this.username}!`);
    },
  }));
});
```

---

### Step 2: Update Your HTML Interface

Now, update **`public/index.html`** to add interactive buttons.
Notice how clean it is to call
the function names directly inside the `@click` handlers:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Alpine.js Lesson 2</title>
    <script src="/app.js" defer></script>
    <script
      defer
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </head>
  <body x-data="bookComponent">
    <h1>Alpine.js Lesson 2: Handling Events</h1>
    <hr />

    <h3>User Profiles</h3>
    <p>Reader: <span x-text="username"></span></p>
    <p>
      Book:
      <span x-text="currentBook || 'No book selected right now...'"></span>
    </p>

    <hr />

    <label for="book-title-field">Type Book Title:</label>
    <input id="book-title-field" type="text" x-model="currentBook" />

    <br /><br />

    <button @click="clearBook()">Clear Current Book</button>

    <button @click="logGreeting()">Trigger Console Greeting</button>
  </body>
</html>
```

---
