import { createSlice } from '@reduxjs/toolkit'
import { IBookDescription } from 'shared/types/bookType'

import { fetchBookDescription } from './bookDescriptionThunk'

interface ErrorType {
    /** Error message.  */
    readonly messageError: string
    /** Error status. */
    readonly status?: string
}
export interface IBookDescriptionState {
    /** Book description. */
    readonly book: IBookDescription
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: ErrorType | null
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
    loading: false,
    error: null,
}

export const bookDescriptionSlice = createSlice({
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
                state.book = action.payload.data
                state.loading = false
                state.error = null
            })
            .addCase(fetchBookDescription.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            }),
})

export default bookDescriptionSlice.reducer
