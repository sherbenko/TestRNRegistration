import {StyleSheet} from 'react-native'
import {colors} from './colors'

export const typography = StyleSheet.create({
  h1: {fontSize: 28, fontWeight: '700', color: colors.text, lineHeight: 36},
  h2: {fontSize: 22, fontWeight: '700', color: colors.text, lineHeight: 30},
  h3: {fontSize: 18, fontWeight: '600', color: colors.text, lineHeight: 26},
  body: {fontSize: 16, fontWeight: '400', color: colors.text, lineHeight: 24},
  bodyMedium: {fontSize: 16, fontWeight: '500', color: colors.text, lineHeight: 24},
  caption: {fontSize: 13, fontWeight: '400', color: colors.textSecondary, lineHeight: 20},
  label: {fontSize: 14, fontWeight: '500', color: colors.text, lineHeight: 20},
  error: {fontSize: 13, fontWeight: '400', color: colors.error, lineHeight: 18},
})
