export function validateIIN(iin: string): boolean {
  if (!/^\d{12}$/.test(iin)) {
    return false
  }
  const d = iin.split('').map(Number)
  const w1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  let sum = w1.reduce((acc, w, i) => acc + w * d[i]!, 0)
  let remainder = sum % 11
  if (remainder === 10) {
    const w2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2]
    sum = w2.reduce((acc, w, i) => acc + w * d[i]!, 0)
    remainder = sum % 11
  }
  return remainder === d[11]
}
