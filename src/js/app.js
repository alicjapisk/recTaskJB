import initInlineSVG from "./inline-svg.js";

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

function renderTeamCard(team) {
  const template = document.getElementById("team-card-template");
  const clone = template.content.cloneNode(true);
  const score = countScore(+team.intWin, +team.intDraw, +team.intLoss);
  clone.querySelector(".team-card__badge").textContent = team.intRank;

  if (+team.intRank <= 3) {
    clone
      .querySelector(".team-card__badge")
      .style.setProperty(
        "--team-card__badge-bg-color",
        "var(--color-badge-default-top)"
      );
    clone
      .querySelector(".team-card__badge")
      .style.setProperty(
        "--team-card__badge-color",
        "var(--color-badge-foreground)"
      );
  } else {
    clone
      .querySelector(".team-card__badge")
      .style.setProperty(
        "--team-card__badge-bg-color",
        "var(--color-badge-default)"
      );
    clone
      .querySelector(".team-card__badge")
      .style.setProperty(
        "--team-card__badge-color",
        "var(--color-badge-default-foreground)"
      );
  }

  clone.querySelector(".team-card__image img").src = team.strBadge;
  clone.querySelector(".team-card__image img").alt = team.strTeam;
  clone.querySelector(".team-card__team-name").textContent = team.strTeam;
  clone
    .querySelector(".team-card__chart-wins")
    .style.setProperty("--progress-wins", score.winsPercentage + "%");
  clone
    .querySelector(".team-card__chart-draws")
    .style.setProperty("--progress-draws", score.drawsPercentage + "%");
  clone
    .querySelector(".team-card__chart-losses")
    .style.setProperty("--progress-losses", score.lossesPercentage + "%");
  clone.querySelector(".team-card__wins").textContent = `W: ${team.intWin}`;
  clone.querySelector(".team-card__draws").textContent = `D: ${team.intDraw}`;
  clone.querySelector(".team-card__losses").textContent = `L: ${team.intLoss}`;
  clone.querySelector(".team-card__points-value").textContent =
    team.intPoints + " PTS";

  return clone;
}

async function renderTeams() {
  const container = document.getElementById("teams_container");
  const teams = await getTeams();
  teams.forEach((team) => {
    container.appendChild(renderTeamCard(team));
  });
}

function countScore(wins, draws, losses) {
  const teamScoreSum = wins + draws + losses;
  const winsPercentage = (wins / teamScoreSum) * 100;
  const drawsPercentage = (draws / teamScoreSum) * 100;
  const lossesPercentage = (losses / teamScoreSum) * 100;

  return {
    winsPercentage,
    drawsPercentage,
    lossesPercentage,
    teamScoreSum,
  };
}

renderTeams();
