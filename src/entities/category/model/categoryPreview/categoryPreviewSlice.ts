import { createSlice } from '@reduxjs/toolkit'
import { IBookPreview } from 'shared/types/bookType'

import { fetchCategoryPreview } from './categoryPreviewThunk'

interface ErrorType {
    /** Error message.  */
    readonly messageError: string
    /** Error status. */
    readonly status?: string
}

export interface IBookPreviewState {
    /** List of books. */
    readonly books: { [key: string]: IBookPreview[] }
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: ErrorType | null
}

const initialState: IBookPreviewState = {
    books: {},
    loading: false,
    error: null,
}

export const categoryPreviewSlice = createSlice({
    name: 'categoryPreview',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchCategoryPreview.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategoryPreview.fulfilled, (state, action) => {
                state.books = {
                    ...state.books,
                    [action.payload.category]: action.payload.data.books,
                }
                state.loading = false
                state.error = null
            })
            .addCase(fetchCategoryPreview.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            }),
})

export default categoryPreviewSlice.reducer
