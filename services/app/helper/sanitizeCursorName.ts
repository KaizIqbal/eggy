export default function sanitizeCurosrName(name: string) {
  return name.toLowerCase().replace(/_/g, " ");
}
