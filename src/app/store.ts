import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { bookDescriptionReducer } from 'entities/book/bookDescripton'
import { bookListReducer } from 'entities/book/bookList'
import { cartReducer } from 'entities/cart'
import { categoryPreviewReducer } from 'entities/categoryPreview'
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
