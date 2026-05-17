import {MIN_AGE, MAX_AGE} from '@/constants/validation'

export function isNotFutureDate(date: Date): boolean {
  return date <= new Date()
}

export function isAdult(date: Date): boolean {
  const today = new Date()
  const minDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate())
  return date <= minDate
}

export function isUnderMaxAge(date: Date): boolean {
  const today = new Date()
  const maxDate = new Date(today.getFullYear() - MAX_AGE, today.getMonth(), today.getDate())
  return date >= maxDate
}

export function formatDate(date: Date): string {
  const d = date.getDate().toString().padStart(2, '0')
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}
