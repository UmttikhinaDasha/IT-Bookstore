import { createAsyncThunk } from '@reduxjs/toolkit'
import { getResultsSearch } from 'shared/api/books'
import { IBookPreview } from 'shared/types/bookType'

interface IFetchSearch {
    /** Search string. */
    readonly searchSrc: string
    /** Page number to receive new items. */
    readonly page: number
}

export interface ResponseType {
    readonly data: {
        /** Total number of books. */
        readonly total: string
        /** List of books for one page. */
        readonly books: IBookPreview[]
    }
}

/** Type of error sent to the storage. */
interface RejectedDataType {
    /** Error message. */
    readonly message: string
    /** Error response object. */
    readonly response: {
        /** Error status. */
        readonly status?: string
    }
}

/** Type of error received after the request. */
interface ErrorType {
    /** Error message.  */
    readonly messageError: string
    /** Error status. */
    readonly status?: string
}

export const fetchSearch = createAsyncThunk<
    ResponseType,
    IFetchSearch,
    { readonly rejectValue: ErrorType }
>('books/fetchSearch', async ({ searchSrc, page }, thunkAPI) => {
    try {
        const response = await getResultsSearch(searchSrc, page)
        return { data: response.data }
    } catch (err: unknown) {
        const knownError = err as RejectedDataType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
