import {StyleSheet} from 'react-native'
import {colors} from '@/theme'

export const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.background},
  flex: {flex: 1},
  scroll: {flex: 1},
  content: {paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40},
  title: {fontSize: 26, fontWeight: '800', color: '#1A1A3A', marginBottom: 4, lineHeight: 34},
  subtitle: {fontSize: 13, color: colors.textSecondary, marginBottom: 20},
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 12,
    marginTop: 4,
  },
  fieldWrapper: {marginBottom: 16},
  fieldContainer: {
    borderWidth: 0,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: colors.white,
  },
  fieldContainerError: {},
  fieldLabel: {fontSize: 13, color: colors.textSecondary, marginBottom: 4},
  asterisk: {color: colors.primary},
  dateText: {fontSize: 15, color: colors.text, height: 22, paddingVertical: 0},
  dateError: {fontSize: 12, color: colors.error, marginTop: 4},
  pickerWrapper: {
    height: 32,
    overflow: 'hidden',
    justifyContent: 'center',
    marginHorizontal: -4,
  },
  picker: {
    color: colors.text,
    marginTop: -10,
    marginBottom: -10,
  },
  actions: {marginTop: 24, gap: 12},
})
