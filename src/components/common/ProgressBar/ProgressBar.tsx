import React from 'react'
import {View} from 'react-native'
import {styles} from './ProgressBar.styles'

type ProgressBarProps = {
  current: number
  total: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({current, total}) => {
  return (
    <View style={styles.row}>
      {Array.from({length: total}).map((_, i) => (
        <View
          key={i}
          style={[styles.segment, i < current ? styles.active : styles.inactive]}
        />
      ))}
    </View>
  )
}

export default ProgressBar
