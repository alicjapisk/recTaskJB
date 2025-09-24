export function renderSkeletons(count) {
  const container = document.getElementById("teams_container");
  const template = document.getElementById("team-card-template");

  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
  }
}
