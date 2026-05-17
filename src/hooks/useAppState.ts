import {useEffect, useState} from 'react'
import {storageService} from '@/services/storageService'
import i18n from '@/i18n'
import type {Role} from '@/types/profile'

type AppState =
  | {route: 'PhoneInput'}
  | {route: 'Profile'}
  | {route: 'Registration'; phone: string; role: Role}
  | null

export function useAppState(): AppState {
  const [state, setState] = useState<AppState>(null)

  useEffect(() => {
    async function resolve() {
      const [profile, draft, lang] = await Promise.all([
        storageService.getProfile(),
        storageService.getDraft(),
        storageService.getLang(),
      ])

      if (lang) {
        await i18n.changeLanguage(lang)
      }

      if (profile) {
        setState({route: 'Profile'})
      } else if (draft && draft.phone && draft.role) {
        setState({route: 'Registration', phone: draft.phone, role: draft.role})
      } else {
        setState({route: 'PhoneInput'})
      }
    }
    resolve()
  }, [])

  return state
}
