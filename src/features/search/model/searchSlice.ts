import { createSlice } from '@reduxjs/toolkit'
import { IBookPreview } from 'shared/types/bookType'

import { fetchSearch } from './searchThunk'

interface ErrorType {
    /** Error message.  */
    readonly messageError: string
    /** Error status. */
    readonly status?: string
}

export interface ISearchState {
    /** Total number of books. */
    readonly totalCountBooks: string
    /** List of books. */
    readonly books: IBookPreview[] | null
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: ErrorType | null
}

const initialState: ISearchState = {
    totalCountBooks: '',
    books: null,
    loading: false,
    error: null,
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchSearch.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.totalCountBooks = action.payload.data.total
                state.books = [...action.payload.data.books]
                state.loading = false
                state.error = null
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            }),
})

export default searchSlice.reducer
