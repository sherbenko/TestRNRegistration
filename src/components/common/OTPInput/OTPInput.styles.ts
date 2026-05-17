import {StyleSheet} from 'react-native'
import {colors} from '@/theme'

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'flex-start',
  },
  cell: {
    width: 50,
    height: 50,
    borderRadius: 18,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  cellEmpty: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: '#DCDCDC',
  },
  cellFilled: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cellError: {
    borderWidth: 2,
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
})
