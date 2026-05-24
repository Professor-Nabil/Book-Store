# Step 1: Create a Clean Navigation Menu (`public/index.html`)

This is just a simple landing page with basic links
so anyone can navigate to your test tools.

```html
<!-- ./public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Book Store API Home</title>
  </head>
  <body>
    <h1>📚 Nabil's API Test Bench</h1>
    <p>Select an action to test your backend endpoints directly:</p>
    <hr />
    <ul>
      <li><a href="/read.html">🔍 View & Delete Books (GET / DELETE)</a></li>
      <li><a href="/create.html">➕ Add a New Book (POST)</a></li>
      <li><a href="/update.html">✏️ Update an Existing Book (PUT)</a></li>
    </ul>
  </body>
</html>
```

---

### Step 2: The View & Delete Page (`public/read.html`)

This page only fetches your array of books
and displays them in a plain list.
Each row has a simple delete button.

```html
<!-- ./public/read.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>View Books</title>
    <script
      defer
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </head>
  <body
    x-data="{
    books: [],
    async getAllBooks() {
        const response = await fetch('/api/books');
        const result = await response.json();
        this.books = result.data;
    },
    async deleteBook(id) {
        await fetch(`/api/books/${id}`, { method: 'DELETE' });
        this.getAllBooks(); // refresh the list
    }
}"
    x-init="getAllBooks()"
  >
    <a href="/">⬅️ Back to Home</a>
    <h2>🔍 Active Books List</h2>
    <hr />

    <ul>
      <template x-for="book in books" :key="book.id">
        <li style="margin-bottom: 10px;">
          <span
            x-text="'Title: ' + book.title + ' | Author: ' + book.author"
          ></span>
          <br />
          <small
            x-text="'ID: ' + book.id"
            style="color: gray; font-family: monospace;"
          ></small>
          <br />
          <button @click="deleteBook(book.id)">❌ Delete This Book</button>
        </li>
      </template>
    </ul>

    <template x-if="books.length === 0">
      <p>No books found in the repository storage layer.</p>
    </template>
  </body>
</html>
```

---

### Step 3: The Creation Page (`public/create.html`)

This page does one thing:
it collects a title and author, then sends a POST request.

```html
<!-- ./public/create.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Create Book</title>
    <script
      defer
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </head>
  <body
    x-data="{
    title: '',
    author: '',
    async submitForm() {
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.title, author: this.author })
        });
        
        if (response.status === 201) {
            alert('Book Created successfully!');
            this.title = '';
            this.author = '';
        } else {
            alert('Validation Error!');
        }
    }
}"
  >
    <a href="/">⬅️ Back to Home</a>
    <h2>➕ Add New Book Endpoint</h2>
    <hr />

    <form @submit.prevent="submitForm()">
      <p>
        <label
          >Book Title:<br />
          <input type="text" x-model="title" required />
        </label>
      </p>
      <p>
        <label
          >Author Name:<br />
          <input type="text" x-model="author" required />
        </label>
      </p>
      <button type="submit">Submit POST Request</button>
    </form>
  </body>
</html>
```

---

### Step 4: The Modification Page (`public/update.html`)

Because you have to copy-paste the specific Book UUID to update it,
this page has a simple field where you paste the ID,
type the new values, and send the PUT request.

```html
<!-- ./public/update.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Update Book</title>
    <script
      defer
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </head>
  <body
    x-data="{
    bookId: '',
    title: '',
    author: '',
    async sendUpdateRequest() {
        const response = await fetch(`/api/books/${this.bookId.trim()}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.title, author: this.author })
        });

        if (response.status === 200) {
            alert('Book Updated Successfully!');
            this.bookId = '';
            this.title = '';
            this.author = '';
        } else {
            alert('Update Failed! Check if the UUID is correct.');
        }
    }
}"
  >
    <a href="/">⬅️ Back to Home</a>
    <h2>✏️ Update Book Endpoint</h2>
    <hr />

    <form @submit.prevent="sendUpdateRequest()">
      <p>
        <label
          >Paste Book UUID:<br />
          <input
            type="text"
            x-model="bookId"
            placeholder="e.g. 123e4567-e89b-12d3..."
            style="width: 300px;"
            required
          />
        </label>
      </p>
      <p>
        <label
          >New Title Name:<br />
          <input type="text" x-model="title" required />
        </label>
      </p>
      <p>
        <label
          >New Author Name:<br />
          <input type="text" x-model="author" required />
        </label>
      </p>
      <button type="submit">Submit PUT Request</button>
    </form>
  </body>
</html>
```

---

### How much simpler is this?

- We deleted the external `app.js` file entirely—the logic is so small now it fits right inside `x-data`.

- There are **no complex variables** (`editingBookId === book.id`) or tracking logic blocks.

- Each file is short, transparent, and handles one endpoint perfectly.

Open `http://localhost:3000` and give this multi-page testing layer a spin! Does this setup feel much more approachable for your workflow?
