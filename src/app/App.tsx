import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Route,
    RouterProvider,
} from 'react-router-dom'
import { BookDescription } from 'pages/bookDescription/bookDescription'
import { Cart } from 'pages/cart/cart'
import { Categories } from 'pages/categories/categories'
import { Category } from 'pages/category/category'
import { HomePage } from 'pages/homePage/homePage'
import { getCategoryNameByLink } from 'shared/helpers/getCategoryNameByLink'
import { useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { Fallback } from 'shared/ui/fallback/fallback'

import { Layout } from './layout/layout'

/** Dynamic path parameter types for breadcrumbs. */
interface IParamsDynamicPath {
    /** Page path name. */
    pathname: string
    /** Page parameters. */
    params?: { categoryId: string; bookId: string }
    /** Additional data for the name of bread crumbs. */
    data?: string
}

function App() {
    const book = useAppSelector(
        (state: RootState) => state.bookDescription.book
    )

    const getDynamicPathForCategory = ({
        pathname,
        params,
    }: IParamsDynamicPath): JSX.Element => {
        return (
            <Link to={pathname}>
                {getCategoryNameByLink(params?.categoryId)}
            </Link>
        )
    }

    const getDynamicPathForBook = ({
        pathname,
        data,
    }: IParamsDynamicPath): JSX.Element => <Link to={pathname}>{data}</Link>

    const routers = createRoutesFromElements(
        <Route
            path='/'
            element={<Layout />}
            handle={{ crumb: <Link to='/'>Home</Link> }}
            errorElement={<Fallback />}>
            {/** Home page. */}
            <Route index element={<HomePage />} />
            {/** All categories. */}
            <Route
                path='books'
                handle={{
                    crumb: <Link to='/books'>Books</Link>,
                }}>
                <Route index element={<Categories />} />
                <Route
                    path=':categoryId'
                    element={<Category />}
                    handle={{
                        crumb: getDynamicPathForCategory,
                    }}
                />
                <Route
                    path='description/:bookId'
                    element={<BookDescription />}
                    loader={() => book.title}
                    handle={{
                        crumb: getDynamicPathForBook,
                    }}
                />
            </Route>

            <Route
                path='cart'
                element={<Cart />}
                handle={{
                    crumb: <Link to='/cart'>Cart</Link>,
                }}
            />

            <Route
                path='search:bookId'
                element={<BookDescription />}
                loader={() => book.title}
                handle={{
                    crumb: getDynamicPathForBook,
                }}
            />
        </Route>
    )

    const router = createBrowserRouter(routers, {})

    return <RouterProvider router={router} />
}

export default App
