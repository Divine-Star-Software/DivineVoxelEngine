export function shortId() {
  return crypto.randomUUID().split("-").pop()!;
}
