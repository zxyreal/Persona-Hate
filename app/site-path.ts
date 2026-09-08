export const siteUrl = 'https://zxyreal.github.io/Persona-Hate/';

export function sitePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}
