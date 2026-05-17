import React from 'react'
import {Text, View} from 'react-native'
import {typography} from '@/theme'
import {styles} from './ProfileField.styles'

interface ProfileFieldProps {
  label: string
  value: string
}

const ProfileField: React.FC<ProfileFieldProps> = ({label, value}) => {
  return (
    <View style={styles.row}>
      <Text style={[typography.caption, styles.label]}>{label}</Text>
      <Text style={[typography.body, styles.value]}>{value}</Text>
    </View>
  )
}

export default ProfileField
