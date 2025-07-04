
import pt from './pt.json'

const translations = {pt}

export type Language = keyof typeof translations
export const availableLanguages = Object.keys(translations) as Language[]

export const getTranslations = (lang: Language) => {
  return translations[lang] || translations.pt
}