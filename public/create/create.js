document.addEventListener("alpine:init", () => {
  Alpine.data("apiTestBench", () => ({
    title: "",
    author: "",

    async submitForm() {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: this.title, author: this.author }),
      });

      if (response.status === 201) {
        alert("Book Created successfully!");
        this.title = "";
        this.author = "";
      } else {
        alert("Validation Error!");
      }
    },
  }));
});
