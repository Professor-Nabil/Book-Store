# Single Page Application using HTMX

## Step 1: Wrap your layout in a main container

```html
<!-- ./views/partials/header.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Workout Tracker App</title>
    <script src="https://unpkg.com/htmx.org@2.0.0"></script>
  </head>
  <body>
    <header>
      <nav>
        <button hx-get="/dashboard-fragment" hx-target="#main-content-window">
          🏠 Home Dashboard
        </button>
        |
        <button hx-get="/profile-fragment" hx-target="#main-content-window">
          👤 My Profile
        </button>
      </nav>
    </header>
    <hr />

    <main id="main-content-window"></main>
  </body>
</html>
```

And update your `views/partials/footer.ejs` to close that new `<main>` window container tag:

```html
<!-- ./views/partials/footer.ejs -->
</main>

    <hr />
    <footer>
        <p>© 2026 Workout Tracker - Pure EJS + HTMX Single Page App</p>
    </footer>
</body>
</html>

```

---

### Step 2: Make your page templates pure fragments

Now, your pages don't need to load the header and footer all over again.
They just contain their own structural fields!

Create a folder named `views/fragments/`.

#### The Dashboard Fragment File

```html
<!-- ./views/fragments/dashboard.ejs -->
<h2>Main Dashboard Pane</h2>

<form hx-post="/create-plan" hx-target="#plan-list" hx-swap="beforeend">
  <label for="planTitle">Plan Title:</label>
  <input type="text" id="planTitle" name="planTitle" required />
  <button type="submit">Add Routine</button>
</form>

<hr />
<ul id="plan-list">
  <% plans.forEach(function(plan) { %>
  <li>💪 <%= plan.title %></li>
  <% }); %>
</ul>
```

#### The Profile Fragment File

```html
<!-- ./views/fragments/profile.ejs -->
<h2>User Profile Settings</h2>
<p>Account Type: Premium Coach</p>
<p>Location: Algeria</p>
```

---

### Step 3: Connect your layout orchestration in `server.ts`

Now, look how your Express controller handles requests dynamically.
If a user types `http://localhost:3000/` directly into the address line bar,
you render the full layout page shell skeleton.
If they just click a link button on your dashboard layout,
you serve only the fragment component!

```ts
// ./src/server.ts

// 1. First full initial entry point load (Renders entire shell skeleton)
app.get("/", (req, res) => {
  // We pass the shell index wrapper which includes header and footer partials
  res.render("index", { plans: userWorkoutPlans });
});

// 2. HTMX Navigation Request Call: Load Dashboard Content Frame
app.get("/dashboard-fragment", (req, res) => {
  // Render ONLY the inner body fragment component file card layout!
  res.render("fragments/dashboard", { plans: userWorkoutPlans });
});

// 3. HTMX Navigation Request Call: Load Profile Content Frame
app.get("/profile-fragment", (req, res) => {
  // Render ONLY the inner profile component file layout!
  res.render("fragments/profile");
});
```

---

## Look what you just built

You now have a fully operational, lightning-fast **Single Page Application (SPA)** framework.

- The user loads the website shell once.

- When they navigate between the dashboard and profile settings tabs,
  HTMX swaps out the center contents
  inside the `#main-content-window` container panel invisibly.

- Your browser never reloads,
  never flashes white,
  and preserves internal app state performance perfectly.
