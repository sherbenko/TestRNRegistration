import React from 'react'
import {Pressable, Text, View} from 'react-native'
import {styles} from './RoleCard.styles'

type RoleCardProps = {
  title: string
  description: string
  selected: boolean
  onPress: () => void
}

const RoleCard: React.FC<RoleCardProps> = ({title, description, selected, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </Pressable>
  )
}

export default RoleCard
