import {StyleSheet} from 'react-native'
import {colors} from '@/theme'

export const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.background},
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A3A',
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 28,
  },
  cards: {flex: 1},
  footer: {
    paddingBottom: 24,
  },
})
