import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from 'app/App'
import { BookDescription } from 'pages/bookDescription/bookDescription'
import { Books } from 'pages/books/books'
import { Categories } from 'pages/categories/categories'
import { MainPage } from 'pages/mainPage/mainPage'
import { store } from 'shared/model/store'

import './index.css'

const routers = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: '/category/:categoryId',
                element: <Books />,
            },
            {
                path: '/categories',
                element: <Categories />,
            },
            {
                path: '/book/:bookId',
                element: <BookDescription />,
            },
        ],
    },
]

const router = createBrowserRouter(routers, {})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
)
