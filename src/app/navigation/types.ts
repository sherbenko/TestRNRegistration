import type {Role} from '@/types/profile'

export type RootStackParamList = {
  PhoneInput: undefined
  RoleSelect: {phone: string}
  OTP: {phone: string; role: Role}
  Registration: {phone: string; role: Role}
  Profile: undefined
}
