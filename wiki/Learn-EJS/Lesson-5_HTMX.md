# Welcome to Lesson 4: Upgrading EJS with HTMX

HTMX's entire purpose is to stop the full-page flash reload.

It tells the browser:
_"Hey, instead of destroying the whole page,
just send the form data in the background,
get a small piece of HTML back,
and swap it right into the list!"_

Let's modify our project to make this transition seamless.
We don't need to change our data arrays;
we just change how the HTML form talks to our routes.

### Step 1: Add HTMX to your Header

First, let's include the HTMX script tag in our shared header
so it's active across our entire application.

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
        <a href="/">🏠 Home Dashboard</a> |
        <a href="/profile">👤 My Profile</a>
      </nav>
    </header>
    <hr />
  </body>
</html>
```

---

### Step 2: Update the Form in `index.ejs`

We are going to remove the old native attributes (`action` and `method`)
and replace them with HTMX attributes.

```html
<!-- ./views/index.ejs -->
<%- include('partials/header') %>

<h2>Main Dashboard Pane</h2>

<form hx-post="/create-plan" hx-target="#plan-list" hx-swap="beforeend">
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

<ul id="plan-list">
  <% plans.forEach(function(plan) { %>
  <li>💪 <%= plan.title %></li>
  <% }); %>
</ul>

<%- include('partials/footer') %>
```

#### What those attributes mean

- **`hx-post="/create-plan"`**:
  Sends the input data using an AJAX post
  request in the background when submitted.

- **`hx-target="#plan-list"`**:
  Directs the incoming response toward the `<ul>` element container.

- **`hx-swap="beforeend"`**:
  Tells HTMX: _"Don't delete the existing list items!
  Just append the new HTML fragment right at the very end of the list."_

---

### Step 3: Update the Server Route

Before, our server redirected with `res.redirect('/')`.
If we do that now,
HTMX will accidentally dump your _entire webpage_ inside your list!

Instead, our server will now render **just the single new list item**
as a tiny HTML component.

```ts
// ./src/server.ts (Only showing the modified post route)

// ... keep all your previous server setup identical ...

app.post("/create-plan", (req, res) => {
  const newTitle = req.body.planTitle;

  if (!newTitle) {
    res.status(400).send("Title is required");
    return;
  }

  // 1. Save to state memory pool
  userWorkoutPlans.push({ title: newTitle });

  // 2. Respond with ONLY the HTML fragment that the target <ul> needs!
  // No full layout redirect, no header, no footer—just the fresh item.
  res.send(`<li>💪 ${newTitle}</li>`);
});
```

---
