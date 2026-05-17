import React, {useCallback, useState} from 'react'
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useFocusEffect} from '@react-navigation/native'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RootStackParamList} from '@/app/navigation/types'
import type {UserProfile} from '@/types/profile'
import {isCarrierProfile} from '@/types/profile'
import ProfileField from '@/components/feature/ProfileField/ProfileField'
import Button from '@/components/common/Button/Button'
import {colors, typography} from '@/theme'
import {storageService} from '@/services/storageService'
import {formatDate} from '@/utils/dateValidators'
import {styles} from './Profile.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      storageService.getProfile().then(p => {
        setProfile(p)
        setIsLoading(false)
      })
    }, []),
  )

  const onEdit = () => {
    if (!profile) {return}
    navigation.navigate('Registration', {phone: profile.phone, role: profile.role})
  }

  const logout = () => {
    Alert.alert(t('common.logout'), '', [
      {text: t('common.back'), style: 'cancel'},
      {
        text: t('common.logout'),
        style: 'destructive',
        onPress: async () => {
          await storageService.clearAll()
          navigation.reset({index: 0, routes: [{name: 'PhoneInput'}]})
        },
      },
    ])
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator style={styles.loader} color={colors.primary} size="large" />
      </SafeAreaView>
    )
  }

  if (!profile) {
    return null
  }

  const roleLabel =
    profile.role === 'customer' ? t('profile.role_customer') : t('profile.role_carrier')

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[typography.h1, styles.title]}>{t('profile.title')}</Text>

        <View style={styles.card}>
          <ProfileField label={t('profile.fields.role')} value={roleLabel} />
          <ProfileField label={t('profile.fields.full_name')} value={profile.fullName} />
          <ProfileField
            label={t('profile.fields.birth_date')}
            value={formatDate(new Date(profile.birthDate))}
          />
          <ProfileField
            label={t('profile.fields.citizenship')}
            value={t(`registration.citizenship_options.${profile.citizenship}`)}
          />
          <ProfileField label={t('profile.fields.phone')} value={profile.phone} />
          <ProfileField label={t('profile.fields.iin')} value={profile.iin} />
          <ProfileField label={t('profile.fields.doc_series')} value={profile.docSeries} />
          <ProfileField
            label={t('profile.fields.doc_issue_date')}
            value={formatDate(new Date(profile.docIssueDate))}
          />
          <ProfileField label={t('profile.fields.doc_issued_by')} value={profile.docIssuedBy} />

          {isCarrierProfile(profile) && (
            <>
              <ProfileField
                label={t('profile.fields.driver_license')}
                value={profile.driverLicense}
              />
              <ProfileField
                label={t('profile.fields.driver_category')}
                value={profile.driverCategory}
              />
              <ProfileField
                label={t('profile.fields.driver_license_date')}
                value={formatDate(new Date(profile.driverLicenseDate))}
              />
            </>
          )}
        </View>

        <Button title={t('common.edit')} onPress={onEdit} style={styles.editBtn} />
        <Button title={t('common.logout')} onPress={logout} variant="secondary" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
