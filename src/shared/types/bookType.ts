import { TPrice } from './priceType'

export interface IBookPreview {
    /** 13 digit edition identifier. */
    readonly isbn13: string
    /** Book cover. */
    readonly image?: string
    /** Book title. */
    readonly title: string
    /** Book subtitle. */
    readonly subtitle: string
    /** Price in $00.00 format. */
    readonly price: TPrice
    /** Book category. Passed through a prop if it cannot be calculated dynamically. */
    readonly categoryId?: string
    /** Additional styles. */
    readonly className?: string
}

export interface IBookDescription {
    /** Book cover. */
    readonly image?: string
    /** Book title. */
    readonly title: string
    /** Book subtitle. */
    readonly subtitle?: string
    /** Authors of the book. */
    readonly authors: string
    /** Book publisher. */
    readonly publisher: string
    /** 10 digit edition identifier. */
    readonly isbn10: string
    /** 13 digit edition identifier. */
    readonly isbn13: string
    /** Number of pages in the book. */
    readonly pages: string
    /** Year of publication. */
    readonly year: string
    /** Book rating. */
    readonly rating: string
    /** Description of the contents of the book. */
    readonly desc: string
    /** Link to detailed information about the book. */
    readonly url: string
    /** Price in $00.00 format. */
    readonly price: TPrice
}
