import {z} from 'zod'
import type {TFunction} from 'i18next'
import type {Citizenship} from '@/types/profile'
import {isNotFutureDate, isAdult, isUnderMaxAge} from '@/utils/dateValidators'
import {validateIIN} from '@/utils/iinValidator'

export type RegistrationFormData = {
  fullName: string
  birthDate: Date
  citizenship: Citizenship
  iin: string
  docSeries: string
  docIssueDate: Date
  docIssuedBy: string
  driverLicense: string
  driverCategory: string
  driverLicenseDate: Date
}

export function buildSchema(t: TFunction<'translation', undefined>, isCarrier: boolean) {
  return z.object({
    fullName: z.string().min(2, t('registration.errors.full_name_min')),
    birthDate: z
      .date()
      .refine(isNotFutureDate, {message: t('registration.errors.birth_date_future')})
      .refine(isAdult, {message: t('registration.errors.birth_date_min_age')})
      .refine(isUnderMaxAge, {message: t('registration.errors.birth_date_max_age')}),
    citizenship: z.string().min(1, t('registration.errors.required')),
    iin: z.string().refine(validateIIN, {message: t('registration.errors.iin_invalid')}),
    docSeries: z.string().min(1, t('registration.errors.required')),
    docIssueDate: z
      .date()
      .refine(isNotFutureDate, {message: t('registration.errors.doc_issue_date_future')}),
    docIssuedBy: z.string().min(1, t('registration.errors.required')),
    driverLicense: isCarrier
      ? z.string().min(1, t('registration.errors.required'))
      : z.string(),
    driverCategory: isCarrier
      ? z.string().min(1, t('registration.errors.required'))
      : z.string(),
    driverLicenseDate: isCarrier
      ? z.date().refine(isNotFutureDate, {message: t('registration.errors.doc_issue_date_future')})
      : z.date(),
  })
}
