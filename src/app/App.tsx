import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Route,
    RouterProvider,
} from 'react-router-dom'
import { BookDescription } from 'pages/bookDescription/bookDescription'
import { Categories } from 'pages/categories/categories'
import { Category } from 'pages/category/category'
import { HomePage } from 'pages/homePage/homePage'
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
    }: IParamsDynamicPath): JSX.Element => (
        <Link to={pathname}>{params?.categoryId}</Link>
    )

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
                path='categories'
                handle={{
                    crumb: <Link to='/categories'>Categories</Link>,
                }}>
                <Route index element={<Categories />} />
                {/** Selected category. */}
                <Route
                    path=':categoryId'
                    handle={{
                        crumb: getDynamicPathForCategory,
                    }}>
                    <Route index element={<Category />} />
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
