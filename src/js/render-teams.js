import { sortTeams } from "./sort-teams.js";
import { getTeams } from "./api.js";
import { renderTeamCard } from "./team-card.js";
import { renderNoResults } from "./no-results.js";
import { renderApiError } from "./api-error.js";

export async function renderTeams(filter = "") {
  const container = document.getElementById("teams_container");
  let allTeams = [];

  try {
    if (allTeams.length === 0) {
      allTeams = await getTeams();
    }

    const filteredTeams = sortTeams(allTeams, filter);

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
