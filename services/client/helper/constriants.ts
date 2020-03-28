import { Platform, CursorName } from "generated/graphql";

export const possiblePlatforms = Object.values(Platform);

const possibleCursors = Object.values(CursorName);
let availableCursors: any = null;

export const setCursors = (fetchedCursors: any) => {
  const cursors = Object.values(fetchedCursors);
  availableCursors = possibleCursors.filter(cursor => !cursors.includes(cursor));
};

export function getAvailableCursors() {
  return availableCursors;
}
