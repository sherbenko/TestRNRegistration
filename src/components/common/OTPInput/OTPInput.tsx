import React, {useRef} from 'react'
import {TextInput, View} from 'react-native'
import {styles} from './OTPInput.styles'

type OTPInputProps = {
  value: string
  onChange: (value: string) => void
  hasError?: boolean
}

const CELL_COUNT = 6

const OTPInput: React.FC<OTPInputProps> = ({value, onChange, hasError = false}) => {
  const inputs = useRef<Array<TextInput | null>>([])

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/\D/g, '').slice(-1)
    const chars = value.split('')
    chars[index] = digit
    const next = chars.join('')
    onChange(next)

    if (digit && index < CELL_COUNT - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus()
      const chars = value.split('')
      chars[index - 1] = ''
      onChange(chars.join(''))
    }
  }

  return (
    <View style={styles.row}>
      {Array.from({length: CELL_COUNT}).map((_, index) => (
          <TextInput
            key={index}
            ref={ref => {
              inputs.current[index] = ref
            }}
            style={[
              styles.cell,
              value[index] ? styles.cellFilled : styles.cellEmpty,
              hasError ? styles.cellError : null,
            ]}
            value={value[index] ?? ''}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent.key, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            selectTextOnFocus
            caretHidden
          />
      ))}
    </View>
  )
}

export default OTPInput
