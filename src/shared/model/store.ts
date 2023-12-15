import { configureStore } from '@reduxjs/toolkit'
import bookDescriptionReducer from 'entities/book/model/bookDescription/bookDescriptionSlice'
import categoryReducer from 'entities/category/model/category/categorySlice'
import categoryPreviewReducer from 'entities/category/model/categoryPreview/categoryPreviewSlice'

// TODO: change store names.
export const store = configureStore({
    reducer: {
        categoryPreview: categoryPreviewReducer,
        category: categoryReducer,
        bookDescription: bookDescriptionReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
