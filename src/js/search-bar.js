import { renderTeams } from "./render-teams.js";

const searchBarInput = document.getElementById("searchInput");
const searchBarImg = document.querySelector(".search-bar__img");
const searchBarBtn = document.querySelector(".search-bar__button");
const searchBarContainer = document.querySelector(".search-bar__container");

function setSearchBarIcon(hasText) {
  if (hasText) {
    searchBarImg.src = "assets/icons/icon-close.svg";
    searchBarImg.alt = "Close icon";
    searchBarBtn.onclick = clearSearch;
  } else {
    searchBarImg.src = "assets/icons/icon-search.svg";
    searchBarImg.alt = "Search icon";
    searchBarBtn.onclick = null;
  }
}

function clearSearch() {
  searchBarInput.value = "";
  renderTeams();
  updateSearchBar("");
  searchBarInput.focus();
}

export function updateSearchBar(query) {
  const hasText = query.length > 0;

  if (hasText || searchBarInput === document.activeElement) {
    searchBarContainer.classList.add("active");
  } else {
    searchBarContainer.classList.remove("active");
  }

  setSearchBarIcon(hasText);
}

searchBarInput.addEventListener("focus", () => {
  searchBarContainer.classList.add("active");
});

searchBarInput.addEventListener("blur", () => {
  if (!searchBarInput.value) {
    searchBarContainer.classList.remove("active");
  }
});

searchBarInput.addEventListener("input", (e) => {
  updateSearchBar(e.target.value);
});
