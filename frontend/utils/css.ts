export function truncate(width: number): string {
  return `
    max-width: ${width}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `
}
