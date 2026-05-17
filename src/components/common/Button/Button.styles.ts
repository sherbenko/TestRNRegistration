import {StyleSheet} from 'react-native'
import {colors} from '@/theme'

export const styles = StyleSheet.create({
  base: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.border,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  textSecondary: {
    color: colors.primary,
  },
  textGhost: {
    color: colors.primary,
    fontWeight: '400',
  },
  textDisabled: {
    color: colors.disabled,
  },
})
