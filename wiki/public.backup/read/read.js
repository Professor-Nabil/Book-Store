document.addEventListener("alpine:init", () => {
  Alpine.data("apiTestBench", () => ({
    books: [],

    async getAllBooks() {
      const response = await fetch("/api/books");
      const result = await response.json();
      this.books = result.data;
    },

    async deleteBook(id) {
      await fetch(`/api/books/${id}`, { method: "DELETE" });
      this.getAllBooks(); // refresh the list
    },
  }));
});
