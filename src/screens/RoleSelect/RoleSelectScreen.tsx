import React, {useState} from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RootStackParamList} from '@/app/navigation/types'
import type {Role} from '@/types/profile'
import RoleCard from '@/components/feature/RoleCard/RoleCard'
import Button from '@/components/common/Button/Button'
import ProgressBar from '@/components/common/ProgressBar/ProgressBar'
import {styles} from './RoleSelect.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelect'>

const RoleSelectScreen: React.FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation()
  const {phone} = route.params
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const goNext = () => {
    if (!selectedRole) {return}
    navigation.navigate('OTP', {phone, role: selectedRole})
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ProgressBar current={2} total={4} />
      <View style={styles.container}>
        <Text style={styles.title}>{t('role.title')}</Text>
        <Text style={styles.subtitle}>{t('role.subtitle')}</Text>

        <View style={styles.cards}>
          <RoleCard
            title={t('role.customer')}
            description={t('role.customer_desc')}
            selected={selectedRole === 'customer'}
            onPress={() => setSelectedRole('customer')}
          />
          <RoleCard
            title={t('role.carrier')}
            description={t('role.carrier_desc')}
            selected={selectedRole === 'carrier'}
            onPress={() => setSelectedRole('carrier')}
          />
        </View>

        <View style={styles.footer}>
          <Button
            title={t('common.next')}
            onPress={goNext}
            disabled={!selectedRole}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RoleSelectScreen
