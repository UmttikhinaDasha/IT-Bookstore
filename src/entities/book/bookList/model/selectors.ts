import { createSelector } from '@reduxjs/toolkit'

import { IBookListState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.bookList
)

export const selectBookListBooks = createSelector(
    selectBase,
    (state: IBookListState) => state.books
)
export const selectBookListTotalCountBooks = createSelector(
    selectBase,
    (state: IBookListState) => state.totalCountBooks
)
export const selectBookListLoading = createSelector(
    selectBase,
    (state: IBookListState) => state.loading
)
export const selectBookListError = createSelector(
    selectBase,
    (state: IBookListState) => state.error
)
