export function renderGoals(value, text) {
  const container = document.createElement("div");
  container.classList.add("team-card__stats-details-goals");
  container.innerHTML = `
    <span class="team-card__stats-details-goals-label">${text}:</span>
    <p class="team-card__stats-details-goals-value">${value}</p>
  `;
  return container;
}
