import React, {useState} from 'react'
import {
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native'
import {colors} from '@/theme'
import {styles} from './AppTextInput.styles'

interface AppTextInputProps extends TextInputProps {
  label: string
  error?: string
  required?: boolean
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  required = false,
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  const isDisabled = props.editable === false

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          focused && styles.containerFocused,
          !!error && styles.containerError,
          isDisabled && styles.containerDisabled,
        ]}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.asterisk}> *</Text>}
        </Text>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.disabled}
          onFocus={e => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={e => {
            setFocused(false)
            onBlur?.(e)
          }}
          {...props}
        />
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export default AppTextInput
