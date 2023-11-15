import { configureStore } from '@reduxjs/toolkit'
import bookPreviewReducer from 'entities/book/model/bookPreviewSlice'

export const store = configureStore({
    reducer: {
        bookPreview: bookPreviewReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
