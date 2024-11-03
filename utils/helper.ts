export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}
