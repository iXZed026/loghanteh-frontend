export function getLocalizedValue<T extends Record<string, string>>(
  translations: T,
  locale: string
): string {
  return translations[locale] ?? translations.en;
}