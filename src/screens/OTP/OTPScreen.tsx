import React, {useState} from 'react'
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RootStackParamList} from '@/app/navigation/types'
import OTPInput from '@/components/common/OTPInput/OTPInput'
import ProgressBar from '@/components/common/ProgressBar/ProgressBar'
import {useOTPTimer} from '@/hooks/useOTPTimer'
import {VALID_OTP_CODE, OTP_TIMER_SECONDS} from '@/constants/validation'
import {formatPhoneDisplay} from '@/utils/phoneFormatter'
import {styles} from './OTP.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>

const OTPScreen: React.FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation()
  const {phone, role} = route.params
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const {seconds, isResendAvailable, restartTimer} = useOTPTimer(OTP_TIMER_SECONDS)

  const onCodeChange = (val: string) => {
    setCode(val)
    setError('')
    if (val.length === 6) {
      verify(val)
    }
  }

  const verify = (codeToCheck: string) => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      if (codeToCheck === VALID_OTP_CODE) {
        navigation.navigate('Registration', {phone, role})
      } else {
        setError(t('otp.invalid_code'))
        setCode('')
      }
    }, 500)
  }

  const resend = () => {
    setCode('')
    setError('')
    restartTimer()
  }

  const timerLabel = isResendAvailable
    ? t('otp.resend')
    : t('otp.timer', {
        sec: `00:${String(seconds).padStart(2, '0')}`,
      })

  return (
    <SafeAreaView style={styles.safe}>
      <ProgressBar current={3} total={4} />
      <View style={styles.container}>
        <Text style={styles.title}>{t('otp.title')}</Text>
        <Text style={styles.subtitle}>{t('otp.subtitle', {phone: formatPhoneDisplay(phone)})}</Text>

        <OTPInput value={code} onChange={onCodeChange} hasError={!!error} />

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        {isVerifying && <Text style={styles.verifyingText}>{t('common.loading')}</Text>}

        <View style={styles.spacer} />

        <Pressable
          onPress={isResendAvailable ? resend : undefined}
          style={[styles.resendBtn, isResendAvailable && styles.resendBtnActive]}>
          <Text
            style={[
              styles.resendText,
              isResendAvailable && styles.resendTextActive,
            ]}>
            {timerLabel}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default OTPScreen
