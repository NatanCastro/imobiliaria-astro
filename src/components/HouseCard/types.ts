export type PropertyDescription = 'area' | 'quartos' | 'banheiros'
export interface HouseProperty {
  description: PropertyDescription
  value: string
}

export interface HousePrice {
  type: 'aluguel' | 'venda'
  value: string
}

export interface House {
  url: string
  title: string
  price: HousePrice
  properties: HouseProperty[]
}
