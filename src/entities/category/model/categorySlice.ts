import { createSlice } from '@reduxjs/toolkit'
import { IBookPreview } from 'shared/types/bookType'

import { fetchCategory } from './categoryThunk'

export interface ICategoryState {
    /** Total number of books. */
    readonly totalCountBooks: string
    /** Current Page. */
    readonly currentPage: string
    /** List of books. */
    readonly books: IBookPreview[]
    /** Data loading indicator. */
    readonly loading: 'idle' | 'loading' | 'succeeded' | 'failed'
    /** Error message. */
    readonly error: null | string
}

const initialState: ICategoryState = {
    totalCountBooks: '',
    currentPage: '',
    books: [],
    loading: 'idle',
    error: null,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.totalCountBooks = action.payload.data.total
                state.currentPage = action.payload.data.page
                state.books = action.payload.data.books
                state.loading = 'succeeded'
                state.error = null
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.payload ?? ''
            }),
})

export default categorySlice.reducer
