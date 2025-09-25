export function renderForm(form) {
  const container = document.createElement("div");
  container.classList.add("team-card__stats-details-form");

  const label = document.createElement("span");
  label.classList.add("team-card__stats-details-form-label");
  label.textContent = "Form:";
  container.appendChild(label);

  const items = document.createElement("div");
  items.classList.add("team-card__stats-details-form-items");

  form
    .split("")
    .reverse()
    .forEach((value) => {
      const span = document.createElement("span");
      span.classList.add(
        "team-card__stats-details-form-items",
        `team-card__stats-details-form-items-${value}`
      );
      span.textContent = value;
      items.appendChild(span);
    });

  container.appendChild(items);
  return container;
}
