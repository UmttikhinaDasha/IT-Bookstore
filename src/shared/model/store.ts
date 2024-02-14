import { combineReducers, configureStore } from '@reduxjs/toolkit'
import bookDescriptionReducer from 'entities/book/model/bookDescription/bookDescriptionSlice'
import categoryReducer from 'entities/category/model/category/categorySlice'
import categoryPreviewReducer from 'entities/category/model/categoryPreview/categoryPreviewSlice'
import cartReducer from 'features/cart/model/cartSlice'
import searchReducer from 'features/search/model/searchSlice'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootRecucer = combineReducers({
    categoryPreview: categoryPreviewReducer,
    category: categoryReducer,
    bookDescription: bookDescriptionReducer,
    cart: cartReducer,
    search: searchReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootRecucer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
