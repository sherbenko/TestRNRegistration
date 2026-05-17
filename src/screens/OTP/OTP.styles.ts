import {StyleSheet} from 'react-native'
import {colors} from '@/theme'

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A3A',
    marginBottom: 10,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    color: '#9E9E9E',
    marginBottom: 28,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 13,
    color: colors.error,
    marginTop: 12,
  },
  verifyingText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 12,
  },
  spacer: {
    flex: 1,
  },
  resendBtn: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  resendBtnActive: {
    borderColor: colors.primary,
  },
  resendText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  resendTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
})
