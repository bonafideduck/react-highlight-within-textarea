import { Find, FlatStrategy, Strategy } from "./types";

export const getMatches = (text: string, flatStrategies: FlatStrategy[]) => {
  // Calls each strategy to get all matches and then filters out overlaps.
  let finds: Find[] = [];
  for (const fs of flatStrategies) {
    const strategy = fs.strategy as Strategy;
    strategy(text, (start: number, end: number) => {
      if (start < end && start >= 0 && end <= text.length) {
        finds.push({
          component: fs.component,
          className: fs.className,
          matchStart: start,
          matchEnd: end,
          matchText: text.slice(start, end),
        });
      }
    });
  }

  let maps = [];

  // Eliminate overlapping finds.
  loop: for (const find of finds) {
    for (let i = find.matchStart; i < find.matchEnd; i++) {
      if (maps[i]) {
        continue loop;
      }
    }
    for (let i = find.matchStart; i < find.matchEnd; i++) {
      maps[i] = find;
    }
  }

  let matches = Array.from(new Set(Object.values(maps))).sort(
    (a, b) => a.matchStart - b.matchStart
  );
  return matches;
};
