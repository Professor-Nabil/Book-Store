# server.ts

```ts
// ./src/server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CRITICAL: Tells Express how to extract data from native HTML form submissions!
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Our local mutable data state layer array
const userWorkoutPlans = [
  { title: "Push Day Routine" },
  { title: "Pull Day Layout" },
];

// 1. Home Dashboard Route
app.get("/", (_req, res) => {
  res.render("index", { plans: userWorkoutPlans });
});

// 2. Fixed Profile Route (Now rendering a clean independent view file!)
app.get("/profile", (_req, res) => {
  res.render("profile");
});

// 3. Form Action POST Submission Endpoint Route
app.post("/create-plan", (req, res) => {
  const newTitle = req.body.planTitle; // Matches the 'name="planTitle"' attribute in our input tag!

  if (newTitle) {
    // Push the new item straight into our server-side data array memory pool
    userWorkoutPlans.push({ title: newTitle });
  }

  // After updating the state, REDIRECT the user back to the homepage to see the fresh list
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("🚀 EJS Form Sandbox running at http://localhost:3000");
});
```

---

## ./views/partials/header.ejs

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

---

## ./views/index.ejs

```html
<!-- ./views/index.ejs -->
<%- include('partials/header') %>

<h2>Main Dashboard Pane</h2>

<form action="/create-plan" method="POST">
  <label for="planTitle">Plan Title:</label>
  <input
    type="text"
    id="planTitle"
    name="planTitle"
    required
    placeholder="e.g., Leg Day"
  />
  <button type="submit">Add Routine</button>
</form>

<hr />

<p>Welcome back! Here is your active training list:</p>
<ul>
  <% plans.forEach(function(plan) { %>
  <li>💪 <%= plan.title %></li>
  <% }); %>
</ul>

<%- include('partials/footer') %>
```

---

## ./views/partials/footer.ejs

```html
<!-- ./views/partials/footer.ejs -->
    <hr />
    <footer>
        <p>© 2026 Workout Tracker - Built with pure EJS components</p>
    </footer>
</body>
</html>

```

---

## ./views/profile.ejs

```html
<!-- ./views/profile.ejs -->
<%- include('partials/header') %>

<h2>User Profile Settings</h2>
<p>Account Type: Premium Coach</p>
<p>Location: Algeria</p>

<%- include('partials/footer') %>
```
