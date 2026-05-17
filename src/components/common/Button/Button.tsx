import React from 'react'
import {
  ActivityIndicator,
  Pressable,
  Text,
  type ViewStyle,
} from 'react-native'
import {colors} from '@/theme'
import {styles} from './Button.styles'

interface ButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  style?: ViewStyle
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
}) => {
  const isDisabled = disabled || loading

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({pressed}) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.white : colors.primary}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'secondary' && styles.textSecondary,
            variant === 'ghost' && styles.textGhost,
            isDisabled && styles.textDisabled,
          ]}>
          {title}
        </Text>
      )}
    </Pressable>
  )
}

export default Button
