import {StyleSheet} from 'react-native'
import {colors} from '@/theme'

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    borderWidth: 0,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: colors.white,
  },
  containerFocused: {},
  containerError: {},
  containerDisabled: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  asterisk: {
    color: colors.primary,
  },
  input: {
    fontSize: 15,
    color: colors.text,
    padding: 0,
    height: 22,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
})
