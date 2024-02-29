import { createAsyncThunk } from '@reduxjs/toolkit'
import { getResultsSearch, IResultsSearch } from 'shared/api'
import { ErrorType, RejectedDataType } from 'shared/types'

interface IFetchBookList {
    /** Search string for a selection of books. */
    readonly search: string
    /** Page number to receive new items. */
    readonly page: number
}

export const fetchBookList = createAsyncThunk<
    IResultsSearch,
    IFetchBookList,
    { readonly rejectValue: RejectedDataType }
>('books/fetchBookList', async ({ search, page }, thunkAPI) => {
    try {
        const response = await getResultsSearch(search, page)
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
