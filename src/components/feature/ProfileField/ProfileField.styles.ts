import {StyleSheet} from 'react-native'
import {colors, spacing} from '@/theme'

export const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    marginBottom: 2,
  },
  value: {
    color: colors.text,
  },
})
