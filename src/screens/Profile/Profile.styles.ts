import {StyleSheet} from 'react-native'
import {colors, spacing} from '@/theme'

export const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.background},
  loader: {flex: 1},
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 40,
  },
  title: {marginBottom: spacing.lg},
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  editBtn: {marginBottom: spacing.sm},
})
