/**
 * Truncates text to a specified number of words and adds ellipsis if truncated.
 * @param text The text to truncate
 * @param wordLimit The maximum number of words to keep (default: 10)
 * @returns The truncated text with ellipsis if needed
 */
export function truncateText(text: string, wordLimit: number = 10): string {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}
