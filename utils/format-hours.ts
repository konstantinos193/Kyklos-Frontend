/**
 * Formats hours with correct Greek grammar
 * 1 ώρα (singular)
 * 2, 3, 4... ώρες (plural)
 */
export function formatHours(hours: number): string {
  if (hours === 1) {
    return "1 ώρα";
  }
  return `${hours} ώρες`;
}

