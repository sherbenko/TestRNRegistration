import {StyleSheet} from 'react-native'
import {colors} from '@/theme'

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  segment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  active: {
    backgroundColor: colors.progressActive,
  },
  inactive: {
    backgroundColor: colors.progressInactive,
  },
})
