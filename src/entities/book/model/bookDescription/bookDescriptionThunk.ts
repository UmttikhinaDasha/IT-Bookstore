import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBook } from 'shared/api/books'
import { IBookDescription } from 'shared/types/bookType'

interface ResponseType {
    readonly data: IBookDescription
}

interface RejectedDataType {
    /** Error message. */
    readonly message: string
    /** Error response object. */
    readonly response: {
        /** Error status. */
        readonly status?: string
    }
}

interface ErrorType {
    /** Error message.  */
    readonly messageError: string
    /** Error status. */
    readonly status?: string
}

export const fetchBookDescription = createAsyncThunk<
    ResponseType,
    string,
    { readonly rejectValue: ErrorType }
>('books/fetchBookDescription', async (isbn13, thunkAPI) => {
    try {
        const response = await getBook(isbn13)
        return { data: response.data }
    } catch (err: unknown) {
        const knownError = err as RejectedDataType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
