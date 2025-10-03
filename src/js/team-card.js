import { countScore } from "./team-card-utils.js";
import { renderForm } from "./team-card-form.js";
import { renderGoals } from "./team-card-goals.js";
import { removeSkeletons } from "./skeletons.js";

export function renderTeamCard(team) {
  const template = document.getElementById("team-card-template");
  const clone = template.content.cloneNode(true);
  const score = countScore(+team.intWin, +team.intDraw, +team.intLoss);

  const goalsConfig = [
    {
      sel: ".team-card__stats-details-goals-for",
      val: team.intGoalsFor,
      label: "Goals for",
    },
    {
      sel: ".team-card__stats-details-goals-against",
      val: team.intGoalsAgainst,
      label: "Goals against",
    },
    {
      sel: ".team-card__stats-details-goals-diff",
      val: team.intGoalDifference,
      label: "Goals difference",
    },
  ];

  // badge
  const badge = clone.querySelector(".team-card__badge");
  badge.textContent = team.intRank;
  badge.textContent = team.intRank;

  if (+team.intRank <= 3) {
    badge.style.setProperty("--team-card__badge-bg-color", "#4a6cf7");
    badge.style.setProperty("--team-card__badge-color", "#f1f5f9");
  } else {
    badge.style.setProperty("--team-card__badge-bg-color", "#e2e8f0");
    badge.style.setProperty("--team-card__badge-color", "#0f172a");
  }

  // logo
  clone
    .querySelector(".team-card__image")
    .style.setProperty("--team-badge-img", `url(${team.strBadge})`);

  // name
  clone.querySelector(".team-card__team-name").textContent = team.strTeam;

  // stats
  clone.querySelector(
    ".team-card__stats-wins"
  ).textContent = `W: ${team.intWin}`;
  clone.querySelector(
    ".team-card__stats-draws"
  ).textContent = `D: ${team.intDraw}`;
  clone.querySelector(
    ".team-card__stats-losses"
  ).textContent = `L: ${team.intLoss}`;
  clone.querySelector(
    ".team-card__points-value"
  ).textContent = `${team.intPoints} PTS`;

  // charts
  clone
    .querySelector(".team-card__chart-wins")
    .style.setProperty("--progress-wins", score.winsPercentage + "%");
  clone
    .querySelector(".team-card__chart-draws")
    .style.setProperty("--progress-draws", score.drawsPercentage + "%");
  clone
    .querySelector(".team-card__chart-losses")
    .style.setProperty("--progress-losses", score.lossesPercentage + "%");

  // form
  clone
    .querySelector(".team-card__stats-details-form")
    .replaceWith(renderForm(team.strForm));

  // goals
  goalsConfig.forEach(({ sel, val, label }) => {
    clone.querySelector(sel)?.replaceWith(renderGoals(val, label));
  });

  removeSkeletons(clone);
  return clone;
}
