export type Role = 'customer' | 'carrier'
export type Citizenship = 'kz' | 'ru' | 'by' | 'other'

export interface BaseProfile {
  role: Role
  fullName: string
  birthDate: string
  citizenship: Citizenship
  phone: string
  iin: string
  docSeries: string
  docIssueDate: string
  docIssuedBy: string
}

export interface CarrierProfile extends BaseProfile {
  role: 'carrier'
  driverLicense: string
  driverCategory: string
  driverLicenseDate: string
}

export type UserProfile = BaseProfile | CarrierProfile

export interface RegistrationDraft {
  role?: Role
  fullName?: string
  birthDate?: string
  citizenship?: Citizenship
  phone?: string
  iin?: string
  docSeries?: string
  docIssueDate?: string
  docIssuedBy?: string
  driverLicense?: string
  driverCategory?: string
  driverLicenseDate?: string
}

export function isCarrierProfile(p: UserProfile): p is CarrierProfile {
  return p.role === 'carrier'
}
