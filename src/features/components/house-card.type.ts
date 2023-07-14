export type House = {
  id: string
  city: string
  name: string
  number: string
  street: string
  district: string
  description: string
  bedroomNumber: number
  suiteNumber: number
  bathroomNumber: number
  parkingSpace: number
  area: number
  rentValue?: number
  purchaseValue?: number
  Image: { cloudId: string; url: string }[]
}
