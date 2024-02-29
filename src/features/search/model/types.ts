import { IBookPreview } from 'shared/api'
import { RejectedDataType } from 'shared/types'

export interface ISearchState {
    /** List of books. */
    readonly books: IBookPreview[] | null
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
