import { useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
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

    const books = useAppSelector((state: RootState) => state.category.books)
    const loading = useAppSelector((state: RootState) => state.category.loading)
    const error = useAppSelector((state: RootState) => state.category.error)
    const totalCountBooks = Number(
        useAppSelector((state: RootState) => state.category.totalCountBooks)
    )
    const currentPage = Number(
        useAppSelector((state: RootState) => state.category.currentPage)
    )

    const dispatch = useAppDispatch()

    const { showBoundary } = useErrorBoundary<ErrorType>()

    useEffect(() => {
        dispatch(fetchCategory({ category: categoryId, page: 1 })).then(
            (res) => {
                if (res.payload?.data.books.length === 0)
                    showBoundary({
                        messageError: 'This category was not found',
                    })
            }
        )
    }, [categoryId])

    const onChangePage = (newPage: number): void => {
        dispatch(fetchCategory({ category: categoryId, page: newPage }))
    }

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
