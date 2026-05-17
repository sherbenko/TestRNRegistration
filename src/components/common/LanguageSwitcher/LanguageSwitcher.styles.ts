import {StyleSheet} from 'react-native'
import {colors, spacing} from '@/theme'

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  pill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.white,
  },
})
