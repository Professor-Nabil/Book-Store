document.addEventListener("alpine:init", () => {
  Alpine.data("alpineInit", () => ({
    init() {},
    async update() {},
  }));
});
