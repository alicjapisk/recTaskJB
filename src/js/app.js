import initInlineSVG from "./inline-svg.js";
import { renderTeamCard } from "./team-card.js";

document.addEventListener("DOMContentLoaded", () => {
  initInlineSVG();
});

async function getTeams() {
  const res = await fetch(
    "https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=4328&s=2024-2025"
  );
  const data = await res.json();
  return data.table;
}

let allTeams = [];

async function renderTeams(filter = "") {
  const container = document.getElementById("teams_container");
  container.innerHTML = "";

  if (allTeams.length === 0) {
    allTeams = await getTeams();
  }
  allTeams
    .filter((team) => team.strTeam.toLowerCase().includes(filter.toLowerCase()))
    .forEach((team) => {
      container.appendChild(renderTeamCard(team));
    });
}

document
  .getElementById("searchInput")
  .addEventListener("input", (e) => renderTeams(e.target.value));

renderTeams();
