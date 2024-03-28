import { createSelector } from '@reduxjs/toolkit'

import { IBookDescriptionState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.bookDescription
)

export const selectBookDescriptionBook = createSelector(
    selectBase,
    (state: IBookDescriptionState) => state.book
)
export const selectBookDescriptionLoading = createSelector(
    selectBase,
    (state: IBookDescriptionState) => state.loading
)
export const selectBookDescriptionError = createSelector(
    selectBase,
    (state: IBookDescriptionState) => state.error
)
