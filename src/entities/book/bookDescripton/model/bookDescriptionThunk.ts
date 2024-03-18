import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBook, IBookDescription } from 'shared/api'
import { ErrorType, RejectedDataType } from 'shared/types'

export const fetchBookDescription = createAsyncThunk<
    IBookDescription,
    string,
    { readonly rejectValue: RejectedDataType }
>('books/fetchBookDescription', async (isbn13, thunkAPI) => {
    try {
        const response = await getBook(isbn13)
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
