import initInlineSVG from "./inline-svg.js";
import { renderTeamCard } from "./team-card.js";

function renderSkeletons(count) {
  const container = document.getElementById("teams_container");
  const template = document.getElementById("team-card-template");

  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initInlineSVG();
  renderSkeletons(5);
});

let allTeams = [];
let teamsLoaded = false;

async function getTeams() {
  const res = await fetch(
    "https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=4328&s=2024-2025"
  );
  const data = await res.json();
  return data.table;
}
function renderNoResults(query) {
  const template = document.getElementById("no-results-template");
  const clone = template.content.cloneNode(true);
  clone.querySelector(
    ".no-results__text"
  ).textContent = `No teams found matching "${query}"`;

  return clone;
}

async function renderTeams(filter = "") {
  const container = document.getElementById("teams_container");

  if (allTeams.length === 0) {
    allTeams = await getTeams();
  }

  const filteredTeams = allTeams.filter((team) =>
    team.strTeam.toLowerCase().includes(filter.toLowerCase())
  );

  container.innerHTML = "";

  if (filteredTeams.length === 0) {
    container.appendChild(renderNoResults(filter));
    return;
  }

  filteredTeams.forEach((team) => {
    container.appendChild(renderTeamCard(team));
  });
}

window.addEventListener("scroll", async () => {
  if (!teamsLoaded) {
    teamsLoaded = true;
    await renderTeams();
  }
});

document
  .getElementById("searchInput")
  .addEventListener("input", (e) => renderTeams(e.target.value));
