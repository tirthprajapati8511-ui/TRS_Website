// Numbers worked out from the achievements archive, so they stay correct as
// results get added.
export function deriveStats(archive) {
  const startYears = archive
    .filter((e) => e.items.length > 0)
    .map((e) => parseInt(e.year, 10))
    .filter(Number.isFinite);
  const total = archive.reduce((sum, e) => sum + e.items.length, 0);
  const stats = [];
  if (startYears.length > 0) {
    // An academic year's competition results land in its second calendar
    // year (e.g. 2019–20 → early 2020), so count from there.
    const years = new Date().getFullYear() - (Math.min(...startYears) + 1);
    stats.push({ value: `${years}+`, label: "Years of competing" });
    stats.push({ value: String(startYears.length), label: "Seasons with results" });
  }
  if (total > 0) stats.push({ value: String(total), label: "Results recorded" });
  return stats;
}
