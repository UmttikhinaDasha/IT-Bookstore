import { createSelector } from '@reduxjs/toolkit'

import { ISearchState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.search
)

export const selectSearchBooks = createSelector(
    selectBase,
    (state: ISearchState) => state.books?.slice(5)
)
export const selectSearchLoading = createSelector(
    selectBase,
    (state: ISearchState) => state.loading
)
export const selectSearchError = createSelector(
    selectBase,
    (state: ISearchState) => state.error
)
