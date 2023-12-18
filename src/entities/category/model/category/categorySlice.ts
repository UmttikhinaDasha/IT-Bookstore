import { createSlice } from '@reduxjs/toolkit'
import { IBookPreview } from 'shared/types/bookType'

import { fetchCategory } from './categoryThunk'

interface ErrorType {
    /** Error message.  */
    readonly messageError: string
    /** Error status. */
    readonly status?: string
}
export interface ICategoryState {
    /** Total number of books. */
    readonly totalCountBooks: string
    /** List of books. */
    readonly books: IBookPreview[] | null
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: ErrorType | null
}

const initialState: ICategoryState = {
    totalCountBooks: '',
    books: null,
    loading: false,
    error: null,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearCategoryStore: (state) => {
            state.books = null
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.totalCountBooks = action.payload.data.total
                state.books = state.books
                    ? [...state.books, ...action.payload.data.books]
                    : [...action.payload.data.books]
                state.loading = false
                state.error = null
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            }),
})

export const { clearCategoryStore } = categorySlice.actions
export default categorySlice.reducer
