import {StyleSheet} from 'react-native'
import {colors} from '@/theme'

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {flex: 1},
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
    lineHeight: 20,
  },
  inputContainer: {
    borderWidth: 0,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: colors.white,
    marginBottom: 16,
  },
  inputContainerFocused: {},
  inputContainerValid: {},
  inputLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  input: {
    fontSize: 15,
    color: colors.text,
    padding: 0,
    height: 22,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 24,
  },
})
