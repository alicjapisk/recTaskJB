export async function getTeams() {
  const res = await fetch(
    "https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=4328&s=2024-2025"
  );
  const data = await res.json();
  return data.table;
}
