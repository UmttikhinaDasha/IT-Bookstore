import { createSlice } from '@reduxjs/toolkit'

import { fetchBookList } from './bookListThunk'
import { IBookListState } from './types'

const initialState: IBookListState = {
    totalCountBooks: '',
    books: null,
    loading: false,
    error: null,
}

const bookListSlice = createSlice({
    name: 'bookList',
    initialState,
    reducers: {
        clearBookListStore: (state) => {
            state.books = null
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchBookList.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBookList.fulfilled, (state, action) => {
                state.totalCountBooks = action.payload.total
                state.books = state.books
                    ? [...state.books, ...action.payload.books]
                    : [...action.payload.books]
                state.loading = false
                state.error = null
            })
            .addCase(fetchBookList.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            }),
})

export const { clearBookListStore } = bookListSlice.actions
export default bookListSlice.reducer
