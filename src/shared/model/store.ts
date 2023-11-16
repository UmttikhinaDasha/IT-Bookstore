import { configureStore } from '@reduxjs/toolkit'
import bookPreviewReducer from 'entities/book/model/bookPreviewSlice'
import categoryReducer from 'entities/category/model/categorySlice'

export const store = configureStore({
    reducer: {
        bookPreview: bookPreviewReducer,
        category: categoryReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
