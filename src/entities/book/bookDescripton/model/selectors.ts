import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.bookDescription
)

export const selectBookDescriptionBook = createSelector(
    selectBase,
    (state) => state.book
)
export const selectBookDescriptionLoading = createSelector(
    selectBase,
    (state) => state.loading
)
export const selectBookDescriptionError = createSelector(
    selectBase,
    (state) => state.error
)
