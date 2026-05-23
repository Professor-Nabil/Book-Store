# EJS (Embedded JavaScript templates)

---

## What is EJS and how does it work?

EJS is a **Server-Side Template Engine**.

1. You write a standard HTML file, but save it with a `.ejs` extension.

2. Inside that HTML, you use special markup tags (`<% %>`)
   to run JavaScript loops, conditions, or print variables.

3. When a user requests a page,
   Node/Express reads the `.ejs` file,
   runs the JavaScript code inside it to build a clean, raw HTML file,
   and sends _only_ that final standard HTML to the browser.

The browser never sees the EJS code;
it only receives pure HTML.

---

## The 3 Essential EJS Tags You Need to Know

| Tag          | What it does                                                           | Example                    |
| ------------ | ---------------------------------------------------------------------- | -------------------------- |
| `<% ... %>`  | **Scriptlet tag** for logic (loops, `if` statements). Outputs nothing. | `<% if (isAdmin) { %>`     |
| `<%= ... %>` | **Outputs a value** into the HTML (escaped for security)               | `<p><%= title %></p>`      |
| `<%- ... %>` | **Outputs raw HTML** or includes other template components             | `<%- include('header') %>` |

---

### 1. The Pure EJS Template

Let's build a clean, structural layout.
Notice how we open a loop with `<%` and close it later with `%>,`
wrapping standard HTML elements inside it.

```html
<!-- ./views/index.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Learning EJS Core</title>
  </head>
  <body>
    <!-- 1. Printing a simple variable string -->
    <h1>Welcome, <%= currentUserName %>!</h1>
    <p>Status: <%= userStatus %></p>
    <hr />

    <h3>Your Training Programs</h3>

    <!-- 2. Conditional Logic: Check if there are any plans -->
    <% if (plans.length === 0) { %>
    <p>You have not created any routines yet.</p>
    <% } else { %>

    <!-- 3. The Array Loop: Render a block for each item -->
    <ul>
      <% plans.forEach(function(plan) { %>
      <li>
        <strong><%= plan.title %></strong>
        <p>Total Exercises: <%= plan.exercises.length %></p>
      </li>
      <% }); %>
    </ul>

    <% } %>
  </body>
</html>
```

---

### 2. The Clean Express Server

Now, look at how beautiful the server code becomes.
No raw HTML strings inside your TypeScript! Express automatically finds the file,
executes the template calculations, and responds.

```ts
// ./src/server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure Express to use EJS as the template renderer
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Our dummy database layer state simulation
const userAccount = {
  name: "Nabil",
  status: "Premium Athlete",
};

const userWorkoutPlans = [
  { id: "p1", title: "Push Day Routine", exercises: ["Bench Press", "Dips"] },
  { id: "p2", title: "Pull Day Layout", exercises: ["Pull-ups", "Rows"] },
];

// Core Endpoint
app.get("/", (req, res) => {
  // res.render takes TWO arguments:
  // 1. The name of the file inside the views folder ('index')
  // 2. An object containing the data you want to inject into that template
  res.render("index", {
    currentUserName: userAccount.name,
    userStatus: userAccount.status,
    plans: userWorkoutPlans,
  });
});

app.listen(3000, () => {
  console.log("🚀 Pure EJS engine sandbox running at http://localhost:3000");
});
```

### Try it out

Run `npm run dev` and view it in the browser.
If you change the data arrays inside `server.ts` and refresh the page,
EJS automatically re-runs your logic loops
and presents the fresh static HTML output.
