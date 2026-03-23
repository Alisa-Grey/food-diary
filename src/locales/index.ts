import translation from './translation.json';
export type TranslationKeys = typeof translation;
export default translation as unknown as TranslationKeys;
