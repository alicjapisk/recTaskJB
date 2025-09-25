import { renderTeams } from "./renderTeams.js";

export function handleSearchBarState(query) {
  const searchBarImg = document.querySelector(".search-bar__img");
  const searchBarBtn = document.querySelector(".search-bar__button");
  const searchBarInput = document.getElementById("searchInput");

  if (query.length > 0) {
    searchBarImg.src = "assets/icon-close.svg";
    searchBarImg.alt = "Close icon";
    searchBarBtn.onclick = () => {
      searchBarInput.value = "";
      renderTeams();
      searchBarImg.src = "assets/icon-search.svg";
      searchBarImg.alt = "Search icon";
      searchBarBtn.onclick = null;
    };
  }
}
