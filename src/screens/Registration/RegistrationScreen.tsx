import React, {useEffect, useState} from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {useForm, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import DateTimePicker from '@react-native-community/datetimepicker'
import {Picker} from '@react-native-picker/picker'
import {useTranslation} from 'react-i18next'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RootStackParamList} from '@/app/navigation/types'
import type {UserProfile, RegistrationDraft} from '@/types/profile'
import {isCarrierProfile} from '@/types/profile'
import AppTextInput from '@/components/common/AppTextInput/AppTextInput'
import Button from '@/components/common/Button/Button'
import ProgressBar from '@/components/common/ProgressBar/ProgressBar'
import {storageService} from '@/services/storageService'
import {formatDate} from '@/utils/dateValidators'
import {styles} from './Registration.styles'
import {type RegistrationFormData, buildSchema} from './types'

type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>

const CITIZENSHIPS = ['kz', 'ru', 'by', 'other'] as const

const DEFAULT_VALUES: RegistrationFormData = {
  fullName: '',
  birthDate: new Date(1990, 0, 1),
  citizenship: 'kz',
  iin: '',
  docSeries: '',
  docIssueDate: new Date(),
  docIssuedBy: '',
  driverLicense: '',
  driverCategory: '',
  driverLicenseDate: new Date(),
}

const RegistrationScreen: React.FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation()
  const {phone, role} = route.params
  const isCarrier = role === 'carrier'

  const schema = buildSchema(t, isCarrier)
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: {errors},
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  })

  const [activePicker, setActivePicker] = useState<string | null>(null)

  useEffect(() => {
    async function populate() {
      const draft = await storageService.getDraft()
      if (draft) {
        reset({
          fullName: draft.fullName ?? '',
          birthDate: draft.birthDate ? new Date(draft.birthDate) : new Date(1990, 0, 1),
          citizenship: draft.citizenship ?? 'kz',
          iin: draft.iin ?? '',
          docSeries: draft.docSeries ?? '',
          docIssueDate: draft.docIssueDate ? new Date(draft.docIssueDate) : new Date(),
          docIssuedBy: draft.docIssuedBy ?? '',
          driverLicense: draft.driverLicense ?? '',
          driverCategory: draft.driverCategory ?? '',
          driverLicenseDate: draft.driverLicenseDate
            ? new Date(draft.driverLicenseDate)
            : new Date(),
        })
        return
      }
      const profile = await storageService.getProfile()
      if (profile) {
        reset({
          fullName: profile.fullName,
          birthDate: new Date(profile.birthDate),
          citizenship: profile.citizenship,
          iin: profile.iin,
          docSeries: profile.docSeries,
          docIssueDate: new Date(profile.docIssueDate),
          docIssuedBy: profile.docIssuedBy,
          driverLicense: isCarrierProfile(profile) ? profile.driverLicense : '',
          driverCategory: isCarrierProfile(profile) ? profile.driverCategory : '',
          driverLicenseDate: isCarrierProfile(profile)
            ? new Date(profile.driverLicenseDate)
            : new Date(),
        })
      }
    }
    populate()
  }, [reset])

  const saveDraft = async () => {
    const values = getValues()
    const draft: RegistrationDraft = {
      role,
      phone,
      fullName: values.fullName,
      birthDate: values.birthDate.toISOString(),
      citizenship: values.citizenship,
      iin: values.iin,
      docSeries: values.docSeries,
      docIssueDate: values.docIssueDate.toISOString(),
      docIssuedBy: values.docIssuedBy,
      ...(isCarrier && {
        driverLicense: values.driverLicense,
        driverCategory: values.driverCategory,
        driverLicenseDate: values.driverLicenseDate.toISOString(),
      }),
    }
    await storageService.saveDraft(draft)
    Alert.alert('', t('common.draft_saved'))
  }

  const onSubmit = async (data: RegistrationFormData) => {
    const baseProfile = {
      role,
      phone,
      fullName: data.fullName,
      birthDate: data.birthDate.toISOString(),
      citizenship: data.citizenship,
      iin: data.iin,
      docSeries: data.docSeries,
      docIssueDate: data.docIssueDate.toISOString(),
      docIssuedBy: data.docIssuedBy,
    }
    const profile: UserProfile = isCarrier
      ? {
          ...baseProfile,
          role: 'carrier' as const,
          driverLicense: data.driverLicense,
          driverCategory: data.driverCategory,
          driverLicenseDate: data.driverLicenseDate.toISOString(),
        }
      : {...baseProfile, role: 'customer' as const}

    await storageService.saveProfile(profile)
    await storageService.clearDraft()
    navigation.reset({index: 0, routes: [{name: 'Profile'}]})
  }

  const renderDateField = (
    name: keyof RegistrationFormData,
    label: string,
    error?: string,
  ) => (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange}}) => (
        <View style={styles.fieldWrapper}>
          <TouchableOpacity
            style={[styles.fieldContainer, !!error && styles.fieldContainerError]}
            onPress={() => setActivePicker(activePicker === name ? null : name)}
            activeOpacity={0.8}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <Text style={styles.dateText}>
              {value instanceof Date ? formatDate(value) : ''}
            </Text>
          </TouchableOpacity>
          {!!error && <Text style={styles.dateError}>{error}</Text>}
          {activePicker === name && (
            <DateTimePicker
              value={value instanceof Date ? value : new Date()}
              mode="date"
              display="spinner"
              maximumDate={new Date()}
              onChange={(_, selected) => {
                setActivePicker(null)
                if (selected) {
                  onChange(selected)
                }
              }}
            />
          )}
        </View>
      )}
    />
  )

  return (
    <SafeAreaView style={styles.safe}>
      <ProgressBar current={4} total={4} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>{t('registration.title')}</Text>
          <Text style={styles.subtitle}>{t('registration.draft_hint')}</Text>

          <Controller
            control={control}
            name="fullName"
            render={({field: {value, onChange, onBlur}}) => (
              <AppTextInput
                label={t('registration.fields.full_name')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.fullName?.message}
                autoCapitalize="words"
                required
              />
            )}
          />

          {renderDateField(
            'birthDate',
            t('registration.fields.birth_date'),
            errors.birthDate?.message,
          )}

          <Controller
            control={control}
            name="citizenship"
            render={({field: {value, onChange}}) => (
              <View style={styles.fieldWrapper}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>
                    {t('registration.fields.citizenship')}
                    <Text style={styles.asterisk}> *</Text>
                  </Text>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={styles.picker}>
                      {CITIZENSHIPS.map(c => (
                        <Picker.Item
                          key={c}
                          label={t(`registration.citizenship_options.${c}`)}
                          value={c}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            )}
          />

          <AppTextInput
            label={t('registration.fields.phone')}
            value={phone}
            editable={false}
          />

          <Controller
            control={control}
            name="iin"
            render={({field: {value, onChange, onBlur}}) => (
              <AppTextInput
                label={t('registration.fields.iin')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.iin?.message}
                keyboardType="numeric"
                maxLength={12}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="docSeries"
            render={({field: {value, onChange, onBlur}}) => (
              <AppTextInput
                label={t('registration.fields.doc_series')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.docSeries?.message}
                required
              />
            )}
          />

          {renderDateField(
            'docIssueDate',
            t('registration.fields.doc_issue_date'),
            errors.docIssueDate?.message,
          )}

          <Controller
            control={control}
            name="docIssuedBy"
            render={({field: {value, onChange, onBlur}}) => (
              <AppTextInput
                label={t('registration.fields.doc_issued_by')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.docIssuedBy?.message}
                required
              />
            )}
          />

          {isCarrier && (
            <>
              <Text style={styles.sectionTitle}>
                {t('registration.fields.driver_license')}
              </Text>

              <Controller
                control={control}
                name="driverLicense"
                render={({field: {value, onChange, onBlur}}) => (
                  <AppTextInput
                    label={t('registration.fields.driver_license')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.driverLicense?.message}
                    required
                  />
                )}
              />

              <Controller
                control={control}
                name="driverCategory"
                render={({field: {value, onChange, onBlur}}) => (
                  <AppTextInput
                    label={t('registration.fields.driver_category')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.driverCategory?.message}
                    required
                  />
                )}
              />

              {renderDateField(
                'driverLicenseDate',
                t('registration.fields.driver_license_date'),
                errors.driverLicenseDate?.message,
              )}
            </>
          )}

          <View style={styles.actions}>
            <Button
              title={t('common.save_draft')}
              onPress={saveDraft}
              variant="secondary"
            />
            <Button
              title={t('common.finish')}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegistrationScreen
