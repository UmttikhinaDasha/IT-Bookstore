import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPreviewCategory } from 'shared/api/books'
import { IBookPreview } from 'shared/types/bookType'

interface ResponseType {
    readonly data: {
        /** List of books. */
        readonly books: IBookPreview[]
    }
    /** Category title.  */
    readonly category: string
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

export const fetchCategoryPreview = createAsyncThunk<
    ResponseType,
    string,
    { readonly rejectValue: ErrorType }
>('books/fetchCategoryPreview', async (category, thunkAPI) => {
    try {
        const response = await getPreviewCategory(category)

        return { data: response.data, category }
    } catch (err: unknown) {
        const knownError = err as RejectedDataType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
