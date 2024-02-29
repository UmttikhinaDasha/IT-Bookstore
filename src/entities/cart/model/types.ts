import { TPrice } from 'shared/types'

export interface ICartItem {
    /** 13 digit edition identifier. */
    readonly isbn13: string
    /** Product image. */
    readonly image?: string
    /** Product Name. */
    readonly title: string
    /** Number of added product units. */
    readonly quantity: number
    /** Total price. */
    readonly price: TPrice
    /** Link to the product. */
    readonly url: string
}
