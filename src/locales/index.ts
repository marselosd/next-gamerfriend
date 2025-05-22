import en from './en.json'
import pt from './pt.json'
import es from './es.json'

const translations = { en, pt, es }

export type Language = keyof typeof translations
export const availableLanguages = Object.keys(translations) as Language[]

export const getTranslations = (lang: Language) => {
  return translations[lang] || translations.en
}