import React from 'react'
import {Pressable, Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {storageService} from '@/services/storageService'
import {styles} from './LanguageSwitcher.styles'

const LANGS = ['ru', 'en'] as const

const LanguageSwitcher: React.FC = () => {
  const {i18n} = useTranslation()
  const current = i18n.language

  const selectLang = async (lang: string) => {
    await i18n.changeLanguage(lang)
    await storageService.saveLang(lang)
  }

  return (
    <View style={styles.row}>
      {LANGS.map(lang => (
        <Pressable
          key={lang}
          onPress={() => selectLang(lang)}
          style={[styles.pill, current === lang && styles.pillActive]}>
          <Text style={[styles.label, current === lang && styles.labelActive]}>
            {lang.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

export default LanguageSwitcher
