document.addEventListener("alpine:init", () => {
  Alpine.data("apiTestBench", () => ({
    bookId: "",
    title: "",
    author: "",

    async sendUpdateRequest() {
      const response = await fetch(`/api/books/${this.bookId.trim()}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: this.title, author: this.author }),
      });

      if (response.status === 200) {
        alert("Book Updated Successfully!");
        this.bookId = "";
        this.title = "";
        this.author = "";
      } else {
        alert("Update Failed! Check if the UUID is correct.");
      }
    },
  }));
});
