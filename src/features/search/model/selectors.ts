import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.search
)

export const selectSearchBooks = createSelector(
    selectBase,
    (state) => state.books?.slice(5)
)
export const selectSearchLoading = createSelector(
    selectBase,
    (state) => state.loading
)
export const selectSearchError = createSelector(
    selectBase,
    (state) => state.error
)
