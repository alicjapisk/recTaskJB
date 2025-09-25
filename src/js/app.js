import initInlineSVG from "./inline-svg.js";
import { renderTeams } from "./render-teams.js";
import { updateSearchBar } from "./search-bar.js";
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
  updateSearchBar(query);
  renderTeams(query);
});
