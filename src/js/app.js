import { getTeams } from "./api.js";
import { renderApiError } from "./apiError.js";
import initInlineSVG from "./inline-svg.js";
import { renderNoResults } from "./no-results.js";
import { renderSkeletons } from "./skeletons.js";
import { renderTeamCard } from "./team-card.js";

document.addEventListener("DOMContentLoaded", () => {
  initInlineSVG();
  renderSkeletons(5);
});

let allTeams = [];
let teamsLoaded = false;

async function renderTeams(filter = "") {
  const container = document.getElementById("teams_container");

  try {
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
  } catch (err) {
    container.innerHTML = "";
    container.appendChild(renderApiError());
  }
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
