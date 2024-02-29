import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { bookDescriptionReducer } from 'entities/book/bookDescripton/model'
import { bookListReducer } from 'entities/book/bookList/model'
import { cartReducer } from 'entities/cart'
import { categoryPreviewReducer } from 'entities/category/categoryPreview/model'
import { searchReducer } from 'features/search'
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
    bookList: bookListReducer,
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
