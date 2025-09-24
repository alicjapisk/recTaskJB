export function renderNoResults(query) {
  const template = document.getElementById("no-results-template");
  const clone = template.content.cloneNode(true);
  clone.querySelector(
    ".no-results__text"
  ).textContent = `No teams found matching "${query}"`;

  return clone;
}
