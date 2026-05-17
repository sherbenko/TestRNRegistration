import AsyncStorage from '@react-native-async-storage/async-storage'
import {STORAGE_KEYS} from '@/constants/storage'
import type {UserProfile, RegistrationDraft} from '@/types/profile'

export const storageService = {
  async getProfile(): Promise<UserProfile | null> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE)
    return raw ? (JSON.parse(raw) as UserProfile) : null
  },

  async saveProfile(profile: UserProfile): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
  },

  async getDraft(): Promise<RegistrationDraft | null> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.DRAFT)
    return raw ? (JSON.parse(raw) as RegistrationDraft) : null
  },

  async saveDraft(draft: RegistrationDraft): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draft))
  },

  async clearDraft(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.DRAFT)
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE)
    await AsyncStorage.removeItem(STORAGE_KEYS.DRAFT)
  },

  async getLang(): Promise<string | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.LANG)
  },

  async saveLang(lang: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.LANG, lang)
  },
}
