import { createSlice } from '@reduxjs/toolkit'
import { IBookPreview } from 'shared/types/bookType'

import { fetchBookPreview } from './bookPreviewThunk'

export interface IBookPreviewState {
    /** List of books. */
    readonly books: { [key: string]: IBookPreview[] }
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: null | string
}

const initialState: IBookPreviewState = {
    books: {},
    loading: false,
    error: null,
}

export const bookPreviewSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchBookPreview.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBookPreview.fulfilled, (state, action) => {
                state.books = {
                    ...state.books,
                    [action.payload.category]: action.payload.data.books,
                }
                state.loading = false
                state.error = null
            })
            .addCase(fetchBookPreview.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? ''
            }),
})

export default bookPreviewSlice.reducer
