const BASE62_CHARS: string =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateShortId(length = 6): string {
  let result = "";

  for (let i = 0; i < length;  i++) {
    const index = Math.floor(Math.random() * BASE62_CHARS.length);
    result += BASE62_CHARS[index];
  }
  return result;
}
