import { configureStore } from '@reduxjs/toolkit'
import bookDescriptionReducer from 'entities/book/model/bookDescription/bookDescriptionSlice'
import bookPreviewReducer from 'entities/book/model/bookPreviewSlice'
import categoryReducer from 'entities/category/model/categorySlice'

// TODO: change store names.
export const store = configureStore({
    reducer: {
        bookPreview: bookPreviewReducer,
        category: categoryReducer,
        bookDescription: bookDescriptionReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
