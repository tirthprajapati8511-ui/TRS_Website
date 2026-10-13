// The "key numbers" shown under the homepage hero and on the Explore page.
// Each value is typed in the admin. Three tokens count automatically from the
// Achievements archive instead, so they stay correct as results are added:
//   {results}  total number of entries
//   {seasons}  academic years that have at least one entry
//   {years}    years since the first result
function archiveCounts(archive) {
  const withResults = archive.filter((e) => e.items.length > 0);
  const startYears = withResults.map((e) => parseInt(e.year, 10)).filter(Number.isFinite);
  return {
    results: archive.reduce((sum, e) => sum + e.items.length, 0),
    seasons: withResults.length,
    years: startYears.length ? new Date().getFullYear() - (Math.min(...startYears) + 1) : 0,
  };
}

export function getKeyNumbers(explore, archive) {
  const counts = archiveCounts(archive);
  const out = [];
  for (const item of explore.keyNumbers ?? []) {
    const label = String(item.label ?? "").trim();
    let value = String(item.value ?? "").trim();
    let automaticZero = false;
    value = value.replace(/\{(results|seasons|years)\}/g, (_, key) => {
      if (counts[key] === 0) automaticZero = true;
      return String(counts[key]);
    });
    if (!value || !label || automaticZero) continue;
    out.push({ value, label });
  }
  return out;
}
