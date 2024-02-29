import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.bookList
)

export const selectBookListBooks = createSelector(
    selectBase,
    (state) => state.books
)
export const selectBookListTotalCountBooks = createSelector(
    selectBase,
    (state) => state.totalCountBooks
)
export const selectBookListLoading = createSelector(
    selectBase,
    (state) => state.loading
)
export const selectBookListError = createSelector(
    selectBase,
    (state) => state.error
)
