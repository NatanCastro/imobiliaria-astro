export type PropertyDescription = 'area' | 'quartos' | 'banheiros'
export type HouseProperty = {
  description: PropertyDescription
  value: number
}

export type HousePrice = {
  type: 'aluguel' | 'venda'
  value: string
}

export type House = {
  id: string
  name: string
  description: string
  number: string
  street: string
  district: string
  city: string
  price: HousePrice[]
  properties: HouseProperty[]
}
