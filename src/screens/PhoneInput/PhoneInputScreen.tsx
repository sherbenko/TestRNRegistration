import React, {useState} from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import {MaskedTextInput} from 'react-native-mask-text'
import {useTranslation} from 'react-i18next'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RootStackParamList} from '@/app/navigation/types'
import Button from '@/components/common/Button/Button'
import ProgressBar from '@/components/common/ProgressBar/ProgressBar'
import {colors} from '@/theme'
import {styles} from './PhoneInput.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'PhoneInput'>

const PHONE_MASK = '+7 (999) 999-99-99'
const FULL_PHONE_LENGTH = 18

const PhoneInputScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation()
  const [phone, setPhone] = useState('')
  const [rawPhone, setRawPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  const isValid = phone.length === FULL_PHONE_LENGTH

  const sendCode = () => {
    if (!isValid) {return}
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigation.navigate('RoleSelect', {phone: rawPhone})
    }, 1000)
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ProgressBar current={1} total={4} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('phone.title')}</Text>
          <Text style={styles.subtitle}>{t('phone.subtitle')}</Text>

          <View
            style={[
              styles.inputContainer,
              focused && styles.inputContainerFocused,
              !focused && isValid && styles.inputContainerValid,
            ]}>
            <Text style={styles.inputLabel}>{t('phone.label')}</Text>
            <MaskedTextInput
              mask={PHONE_MASK}
              onChangeText={(masked, raw) => {
                setPhone(masked)
                setRawPhone(raw)
              }}
              value={phone}
              keyboardType="phone-pad"
              style={styles.input}
              placeholder={t('phone.placeholder')}
              placeholderTextColor={colors.disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </View>

          <View style={styles.footer}>
            <Button
              title={t('phone.send_code')}
              onPress={sendCode}
              disabled={!isValid}
              loading={isLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default PhoneInputScreen
