import { useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { useParams, useSearchParams } from 'react-router-dom'
import { clearCategoryStore } from 'entities/category/model/category/categorySlice'
import { fetchCategory } from 'entities/category/model/category/categoryThunk'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { Breadcrumbs } from 'shared/ui/breadcrumbs/breadcrumbs'
import { ErrorType } from 'shared/ui/fallback/fallback'
import { LoaderCategory } from 'shared/ui/loaders/loaderCategory/loaderCategory'
import { BookCategoryPagination } from 'widgets/bookСategoryPagination/bookCategoryPagination'

import './category.scss'

export const Category = () => {
    const { categoryId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams({ page: '1' })

    const currentPage = Number(searchParams.get('page')) || 1

    const books = useAppSelector((state: RootState) => state.category.books)
    const loading = useAppSelector((state: RootState) => state.category.loading)
    const error = useAppSelector((state: RootState) => state.category.error)
    const totalCountBooks = Number(
        useAppSelector((state: RootState) => state.category.totalCountBooks)
    )
    const dispatch = useAppDispatch()

    const { showBoundary } = useErrorBoundary<ErrorType>()

    const onChangePage = (newPage: number): void => {
        const page = newPage.toString() || '1'
        setSearchParams({ page })
    }

    const getData = (newPage: number): void => {
        /** Getting books for two pages. */
        if (categoryId) {
            dispatch(
                fetchCategory({
                    category: categoryId,
                    page: newPage * 2 - 1,
                })
            )
            dispatch(
                fetchCategory({
                    category: categoryId,
                    page: newPage * 2,
                })
            )
        }
    }

    useEffect(() => {
        if (Number.isNaN(Number(searchParams.get('page')))) {
            onChangePage(1)
        }
    }, [searchParams])

    useEffect(() => {
        let ignore = false

        async function startFetching() {
            await dispatch(clearCategoryStore())
            if (!ignore) {
                getData(currentPage)
            }
        }

        startFetching()
        return () => {
            ignore = true
        }
    }, [currentPage, categoryId])

    useEffect(() => {
        if (!loading && books && books.length === 0)
            showBoundary({
                messageError: 'This category was not found',
            })
    }, [loading, books])

    if (error) showBoundary(error)

    return (
        <div className='category _container'>
            {loading && <LoaderCategory numBookLoaders={20} />}
            {!loading && (
                <>
                    <Breadcrumbs />
                    <BookCategoryPagination
                        books={books}
                        onChangePage={onChangePage}
                        totalCountBooks={totalCountBooks}
                        currentPage={currentPage}
                    />
                </>
            )}
        </div>
    )
}
