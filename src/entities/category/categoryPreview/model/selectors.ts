import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.categoryPreview
)

export const selectCategoryPreviewBooks = createSelector(
    selectBase,
    (state) => state.books
)
export const selectCategoryPreviewLoading = createSelector(
    selectBase,
    (state) => state.loading
)
export const selectCategoryPreviewError = createSelector(
    selectBase,
    (state) => state.error
)
