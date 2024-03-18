import { useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import {
    selectBookListBooks,
    selectBookListError,
    selectBookListLoading,
    selectBookListTotalCountBooks,
} from 'entities/book/bookList/model'
import { useAppSelector, usePaginationBooks, usePrevious } from 'shared/lib'
import { RejectedDataType } from 'shared/types'
import { Breadcrumbs } from 'shared/ui/breadcrumbs'
import { LoaderBookList } from 'shared/ui/loaders/loaderBookList'
import { BookListPagination } from 'widgets/bookListPagination'

import './category.scss'

export const Category = () => {
    const { categoryId } = useParams()
    const [isFirstLoad, setIsFirstLoad] = useState(true)

    const books = useAppSelector(selectBookListBooks)
    const totalCountBooks = Number(
        useAppSelector(selectBookListTotalCountBooks)
    )
    const error = useAppSelector(selectBookListError)
    const loading = useAppSelector(selectBookListLoading)
    const prevLoading = usePrevious(loading)
    const { currentPage, onChangePage } = usePaginationBooks(categoryId)

    const { showBoundary } = useErrorBoundary<RejectedDataType>()

    if (prevLoading === true && loading === false && isFirstLoad) {
        setIsFirstLoad(false)
    }

    if (!loading && books?.length === 0 && !isFirstLoad) {
        showBoundary({
            messageError: 'This category was not found',
        })
    }

    if (error) showBoundary(error)
    if (loading) return <LoaderBookList numBookLoaders={20} />

    return (
        <div className='category _container'>
            <Breadcrumbs />
            <BookListPagination
                books={books}
                onChangePage={onChangePage}
                totalCountBooks={totalCountBooks}
                currentPage={currentPage}
            />
        </div>
    )
}
