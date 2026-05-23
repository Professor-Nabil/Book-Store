# Welcome to **Lesson 2: Partials and Reusable Components**

---

## Setting Up Your Architecture

Create a new sub-folder inside your `views` directory called `partials`.

Your file structure should look like this:

```text
views/
  ├── partials/
  │     ├── header.ejs
  │     └── footer.ejs
  └── index.ejs

```

Let's write these 3 clean files.

### 1. The Shared Header

This file contains the top half of your HTML setup, which every page needs.

```html
<!-- ./views/partials/header.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Workout Tracker App</title>
  </head>
  <body>
    <header>
      <nav>
        <a href="/">🏠 Home Dashboard</a> |
        <a href="/profile">👤 My Profile</a>
      </nav>
    </header>
    <hr />
  </body>
</html>
```

### 2. The Shared Footer

This file closes out the open tags from the header cleanly at the bottom.

```html
<!-- ./views/partials/footer.ejs -->
    <hr />
    <footer>
        <p>© 2026 Workout Tracker - Built with pure EJS components</p>
    </footer>
</body>
</html>

```

### 3. Your Main Page (`index.ejs`)

Look how incredibly short and readable your main file becomes!
We use `<%-` (with a hyphen) because we want EJS to render the **raw HTML structural elements**
from those partial files rather than escaping them as plain text.

```html
<!-- ./views/index.ejs -->
<%- include('partials/header') %>

<h2>Main Dashboard Pane</h2>

<p>Welcome back! Here is your active training list:</p>
<ul>
  <% plans.forEach(function(plan) { %>
  <li>💪 <%= plan.title %></li>
  <% }); %>
</ul>

<%- include('partials/footer') %>
```

---

## Let's Update your `server.ts` to see it navigate

Let's add a second route so you can see how both files reuse
the exact same header and footer fragments perfectly.

```ts
// ./src/server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

const userWorkoutPlans = [
  { title: "Push Day Routine" },
  { title: "Pull Day Layout" },
];

// Route 1: Home Dashboard
app.get("/", (req, res) => {
  res.render("index", { plans: userWorkoutPlans });
});

// Route 2: Profile Page (Let's create a quick inline render to test)
app.get("/profile", (req, res) => {
  // You can send raw EJS blocks from the server directly if you want,
  // but here we just pass variables to a fresh string or page
  res.send(`
        ${path.join(__dirname, "../views/partials/header")} <!-- Behind the scenes concept -->
        <h3>User Profile Settings</h3>
        <p>Account Type: Premium Coach</p>
    `);
});

app.listen(3000, () => {
  console.log("🚀 Pure EJS engine sandbox running at http://localhost:3000");
});

// NOTE: Continue to lesson 3

// To do it cleanly with a file, you'd make a profile.ejs file!
// Let's stick to the main concept: open http://localhost:3000 in your browser.
```

If you view the source code of your webpage in the browser (`Ctrl+U` or `Cmd+Option+U`),
you will see that EJS stitched all three files together perfectly into a single,
seamless HTML document.
