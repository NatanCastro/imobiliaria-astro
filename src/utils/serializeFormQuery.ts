type Props = {
  [key: string]: string[] | number | string
}

export const serializeFormQuery = (d: Props): string => {
  const t: Record<string, number | string[] | string> = d

  const params = new URLSearchParams()
  for (const key in t) {
    if (Object.prototype.hasOwnProperty.call(t, key)) {
      let value = t[key]

      if (t[key] === 0) continue

      switch (typeof value) {
        case 'number':
          value = value.toString()
          break
        case 'string':
          break
        case 'object':
          value = value.join(',')
          break
        case 'undefined':
        case 'bigint':
        case 'symbol':
        case 'boolean':
        case 'function':
          continue
      }

      params.append(key, value)
    }
  }

  return params.toString()
}
