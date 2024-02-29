import { createAsyncThunk } from '@reduxjs/toolkit'
import { getResultsSearch, IResultsSearch } from 'shared/api'
import { ErrorType, RejectedDataType } from 'shared/types'

interface IFetchSearch {
    /** Search string. */
    readonly searchSrc: string
    /** Page number to receive new items. */
    readonly page: number
}

export const fetchSearch = createAsyncThunk<
    IResultsSearch,
    IFetchSearch,
    { readonly rejectValue: RejectedDataType }
>('books/fetchSearch', ({ searchSrc, page }, thunkAPI) => {
    try {
        const response = getResultsSearch(searchSrc, page)
        return response
    } catch (err: unknown) {
        const knownError = err as ErrorType

        return thunkAPI.rejectWithValue({
            messageError: knownError.message,
            status: knownError.response?.status,
        })
    }
})
