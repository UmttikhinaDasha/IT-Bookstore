import { IBookPreview } from '../book/types'

export interface IResultsSearch {
    /** Total number of books. */
    readonly total: string
    /** List of books for one page. */
    readonly books: IBookPreview[]
}
