import 'i18next'
import type translation from './i18n/locales/ru.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof translation
    }
  }
}
