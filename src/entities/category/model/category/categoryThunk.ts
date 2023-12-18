import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCategory } from 'shared/api/books'
import { IBookPreview } from 'shared/types/bookType'

interface IFetchCategory {
    /** Name of category. */
    readonly category: string
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

export const fetchCategory = createAsyncThunk<
    ResponseType,
    IFetchCategory,
    { readonly rejectValue: ErrorType }
>('books/fetchCategory', async ({ category, page }, thunkAPI) => {
    try {
        const response = await getCategory(category, page)
        return { data: response.data, category }
    } catch (err: unknown) {
        const knownError = err as RejectedDataType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
