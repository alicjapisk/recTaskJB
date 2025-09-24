export function renderApiError() {
  const template = document.getElementById("error-template");
  const clone = template.content.cloneNode(true);
  clone.querySelector(".error__text").textContent =
    "There was a problem. Please try again later.";
  return clone;
}
