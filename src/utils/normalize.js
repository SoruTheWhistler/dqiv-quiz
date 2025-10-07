export function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}
