import { createSelector } from '@reduxjs/toolkit'

import { IBookPreviewState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.categoryPreview
)

export const selectCategoryPreviewBooks = createSelector(
    selectBase,
    (state: IBookPreviewState) => state.books
)
export const selectCategoryPreviewLoading = createSelector(
    selectBase,
    (state: IBookPreviewState) => state.loading
)
export const selectCategoryPreviewError = createSelector(
    selectBase,
    (state: IBookPreviewState) => state.error
)
