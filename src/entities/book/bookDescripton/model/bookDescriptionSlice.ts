import { createSlice } from '@reduxjs/toolkit'

import { fetchBookDescription } from './bookDescriptionThunk'
import { IBookDescriptionState } from './types'

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
        url: '',
        price: '$00.00',
    },
    loading: false,
    error: null,
}

const bookDescriptionSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchBookDescription.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBookDescription.fulfilled, (state, action) => {
                state.book = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchBookDescription.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            }),
})

export default bookDescriptionSlice.reducer
