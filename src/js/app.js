import { handleSearchBarState } from "./handleSearchBarState.js";
import initInlineSVG from "./inline-svg.js";
import { renderTeams } from "./renderTeams.js";
import { renderSkeletons } from "./skeletons.js";

document.addEventListener("DOMContentLoaded", () => {
  initInlineSVG();
  renderSkeletons(5);
});

let teamsLoaded = false;

window.addEventListener("scroll", async () => {
  if (!teamsLoaded) {
    teamsLoaded = true;
    await renderTeams();
  }
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.trim();
  handleSearchBarState(query);
  renderTeams(query);
});
