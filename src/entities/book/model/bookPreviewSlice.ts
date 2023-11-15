import { createSlice } from '@reduxjs/toolkit'
import { IBookPreview } from 'shared/types/bookType'

import { fetchBookPreview } from './bookPreviewThunk'

export interface IBookPreviewState {
    /** List of books. */
    readonly books: { [key: string]: IBookPreview[] }
    /** Data loading indicator. */
    readonly loading: 'idle' | 'loading' | 'succeeded' | 'failed'
    /** Error message. */
    readonly error: null | string
}

const initialState: IBookPreviewState = {
    books: {},
    loading: 'idle',
    error: null,
}

export const bookPreviewSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchBookPreview.pending, (state) => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(fetchBookPreview.fulfilled, (state, action) => {
                state.books = {
                    ...state.books,
                    [action.payload.category]: action.payload.data.books,
                }
                state.loading = 'succeeded'
                state.error = null
            })
            .addCase(fetchBookPreview.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.payload ?? ''
            }),
})

export default bookPreviewSlice.reducer
