import { IBookPreview } from 'shared/api'
import { RejectedDataType } from 'shared/types'

export interface IBookListState {
    /** Total number of books. */
    readonly totalCountBooks: string
    /** List of books. */
    readonly books: IBookPreview[] | null
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
