import { createSlice } from '@reduxjs/toolkit'

import { fetchSearch } from './searchThunk'
import { ISearchState } from './types'

const initialState: ISearchState = {
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
                state.books = [...action.payload.books]
                state.loading = false
                state.error = null
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            }),
})

export default searchSlice.reducer
