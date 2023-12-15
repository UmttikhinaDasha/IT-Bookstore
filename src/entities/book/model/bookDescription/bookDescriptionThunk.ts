import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBook } from 'shared/api/books'
import { IBookDescription } from 'shared/types/bookType'

interface ResponseType {
    /** Book description data. */
    readonly data: IBookDescription
}

/** Type of error received after the request. */
interface ErrorType {
    /** Error message. */
    readonly message: string
    /** Error response object. */
    readonly response: {
        /** Error status. */
        readonly status?: string
    }
}

/** Type of error sent to the storage. */
interface RejectedDataType {
    /** Error message.  */
    readonly messageError: string
    /** Error status. */
    readonly status?: string
}

export const fetchBookDescription = createAsyncThunk<
    ResponseType,
    string,
    { readonly rejectValue: RejectedDataType }
>('books/fetchBookDescription', async (isbn13, thunkAPI) => {
    try {
        const response = await getBook(isbn13)
        return { data: response.data }
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
