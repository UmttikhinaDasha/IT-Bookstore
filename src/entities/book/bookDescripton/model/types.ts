import { IBookDescription } from 'shared/api'
import { RejectedDataType } from 'shared/types'

export interface IBookDescriptionState {
    /** Book description. */
    readonly book: IBookDescription
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
