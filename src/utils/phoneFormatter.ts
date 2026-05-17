export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  const local = digits.length === 11 ? digits.slice(1) : digits
  if (local.length !== 10) {
    return `+7${digits}`
  }
  return `+7 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6, 8)} ${local.slice(8, 10)}`
}
