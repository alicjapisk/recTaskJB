export function sortTeams(teams, query) {
  const normalized = query.toLowerCase();

  return teams
    .filter((team) => team.strTeam.toLowerCase().startsWith(normalized))
    .sort((a, b) => +a.intRank - +b.intRank);
}
