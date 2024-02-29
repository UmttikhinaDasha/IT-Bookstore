import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.cart
)

export const selectCart = createSelector(selectBase, (state) => state.cart)
