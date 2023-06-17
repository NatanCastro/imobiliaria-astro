export const serializeFormQuery = (d: { [key: string]: string | number }): string => {
  console.table(d)
  const t: Record<string, any> = d
  console.table(t)

  const params = new URLSearchParams()
  for (const key in t) {
    if (Object.prototype.hasOwnProperty.call(d, key)) {
      params.append(key, t[key])
    }
  }
  return params.toString()
}
