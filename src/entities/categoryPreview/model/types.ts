import { IBookPreview } from 'shared/api'
import { RejectedDataType } from 'shared/types'

export interface IBookPreviewState {
    /** List of books. */
    readonly books: { [key: string]: IBookPreview[] }
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
