import { useEffect, useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import {
    clearBookListStore,
    selectBookListBooks,
    selectBookListError,
    selectBookListLoading,
    selectBookListTotalCountBooks,
} from 'entities/book/bookList/model'
import {
    useAppDispatch,
    useAppSelector,
    usePaginationBooks,
    usePrevious,
} from 'shared/lib'
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
    const dispatch = useAppDispatch()
    const { currentPage, onChangePage } = usePaginationBooks(categoryId)

    const { showBoundary } = useErrorBoundary<RejectedDataType>()

    useEffect(() => {
        return () => {
            dispatch(clearBookListStore())
        }
    }, [])

    if (prevLoading === true && loading === false && isFirstLoad) {
        setIsFirstLoad(false)
    }

    if (!loading && books?.length === 0 && !isFirstLoad) {
        showBoundary({
            messageError: 'This category was not found',
        })
    }

    if (error) showBoundary(error)

    return (
        <div className='category _container'>
            {loading && <LoaderBookList numBookLoaders={20} />}
            {!loading && (
                <>
                    <Breadcrumbs />
                    <BookListPagination
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
