export type RealState = {
  id: string
  state: string
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
  swimmingpool: boolean
  condominium: boolean
  rentUrl?: string
  lessorId?: string
  Image: { cloudId: string; url: string }[]
}
