import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Outlet,
    Route,
    RouterProvider,
} from 'react-router-dom'
import { BookDescription } from 'pages/bookDescription/bookDescription'
import { Books } from 'pages/books/books'
import { Categories } from 'pages/categories/categories'
import { MainPage } from 'pages/mainPage/mainPage'
import { useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'

import { Layout } from './layout/layout'

interface IParamsDynamicPath {
    pathname: string
    params?: { categoryId: string; bookId: string }
    data?: string
}

function App() {
    const book = useAppSelector(
        (state: RootState) => state.bookDescription.book
    )

    const getDynamicPathForCategory = ({
        pathname,
        params,
    }: IParamsDynamicPath) => <Link to={pathname}>{params?.categoryId}</Link>

    const getDynamicPathForBook = ({ pathname, data }: IParamsDynamicPath) => (
        <Link to={pathname}>{data}</Link>
    )

    const routers = createRoutesFromElements(
        <Route
            path='/'
            element={<Layout />}
            handle={{ crumb: <Link to='/'>Home</Link> }}>
            {/** Home page. */}
            <Route index element={<MainPage />} />
            {/** All categories. */}
            <Route
                path='categories'
                element={<Outlet />}
                handle={{
                    crumb: <Link to='/categories'>Categories</Link>,
                }}>
                <Route index element={<Categories />} />
                {/** Selected category. */}
                <Route
                    path=':categoryId'
                    element={<Outlet />}
                    handle={{
                        crumb: getDynamicPathForCategory,
                    }}>
                    <Route index element={<Books />} />
                    {/** Description of the book of the selected category. */}
                    <Route
                        path=':bookId'
                        element={<BookDescription />}
                        loader={() => book.title}
                        handle={{
                            crumb: getDynamicPathForBook,
                        }}
                    />
                </Route>
            </Route>
        </Route>
    )

    const router = createBrowserRouter(routers, {})

    return <RouterProvider router={router} />
}

export default App
