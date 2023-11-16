import { createSlice } from '@reduxjs/toolkit'
import { IBookDescription } from 'shared/types/bookType'

import { fetchBookDescription } from './bookDescriptionThunk'

export interface IBookDescriptionState {
    /** Book description. */
    readonly book: IBookDescription
    /** Data loading indicator. */
    readonly loading: 'idle' | 'loading' | 'succeeded' | 'failed'
    /** Error message. */
    readonly error: null | string
}

const initialState: IBookDescriptionState = {
    book: {
        title: '',
        authors: '',
        publisher: '',
        isbn10: '',
        isbn13: '',
        pages: '',
        year: '',
        rating: '',
        desc: '',
        price: '$00.00',
    },
    loading: 'idle',
    error: null,
}

export const bookDescriptionSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchBookDescription.pending, (state) => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(fetchBookDescription.fulfilled, (state, action) => {
                state.book = action.payload.data
                state.loading = 'succeeded'
                state.error = null
            })
            .addCase(fetchBookDescription.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.payload ?? ''
            }),
})

export default bookDescriptionSlice.reducer
