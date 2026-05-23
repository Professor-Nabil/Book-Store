# Lesson 3: Rendering Separate Pages & Handling Form Submissions

In this lesson, we will make a dedicated `profile.ejs` page to fix that profile route,
and we will add an HTML **Form** on the dashboard
to see how the server accepts user data inputs to update your array state dynamically.

### Step 1: Create the Profile Template

Create a new file named `profile.ejs` directly inside your `views` folder (next to `index.ejs`):

```html
<!-- ./views/profile.ejs -->
<%- include('partials/header') %>

<h2>User Profile Settings</h2>
<p>Account Type: Premium Coach</p>
<p>Location: Algeria</p>

<%- include('partials/footer') %>
```

---

### Step 2: Add the Form to `index.ejs`

Let's update `index.ejs` to include a native HTML form.
When a user submits this form, the browser will
send a standard POST request containing the new plan title to our server.

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

### Step 3: Update `server.ts` to process POST data

To read values out of an incoming form request (`req.body`),
we have to add a built-in Express middleware called `express.urlencoded`.
Let's update your server file to handle both the clean `/profile` page render
and the `/create-plan` submission.

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
app.get("/", (req, res) => {
  res.render("index", { plans: userWorkoutPlans });
});

// 2. Fixed Profile Route (Now rendering a clean independent view file!)
app.get("/profile", (req, res) => {
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
