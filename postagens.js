/* Interações específicas da página postagens.html */
const postSearch = document.getElementById("postSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const allArticles = document.querySelectorAll(
  ".pagina-postagens .featured-article, .pagina-postagens .article-card"
);
const postsCount = document.getElementById("postsCount");
const noResults = document.getElementById("noResults");
const clearFilters = document.getElementById("clearFilters");
let activeCategory = "todos";

function normalizeText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function filterArticles() {
  if (!postSearch || !postsCount) return;
  const term = normalizeText(postSearch.value);
  let count = 0;

  allArticles.forEach((article) => {
    const category = article.dataset.category || "";
    const content = normalizeText((article.dataset.search || "") + " " + article.textContent);
    const visible = (activeCategory === "todos" || category === activeCategory) && content.includes(term);
    article.hidden = !visible;
    if (visible) count++;
  });

  postsCount.textContent = count === 1 ? "1 publicação" : `${count} publicações`;
  if (noResults) noResults.hidden = count !== 0;
}

if (postSearch) postSearch.addEventListener("input", filterArticles);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter || "todos";
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    filterArticles();
  });
});

if (clearFilters) {
  clearFilters.addEventListener("click", () => {
    if (postSearch) postSearch.value = "";
    activeCategory = "todos";
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === "todos";
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    filterArticles();
  });
}

if (postSearch && postsCount) filterArticles();
