import { useErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import {
    selectBookListBooks,
    selectBookListError,
    selectBookListLoading,
    selectBookListTotalCountBooks,
} from 'entities/book/bookList'
import { useAppSelector } from 'shared/lib'
import { RejectedDataType } from 'shared/types'
import { LoaderBookList } from 'shared/ui/loaders/loaderBookList'
import {
    BookListPagination,
    usePaginationBooks,
} from 'widgets/bookListPagination'

import './searchResults.scss'

export const SearchResults = () => {
    const { searchLine } = useParams()

    const books = useAppSelector(selectBookListBooks)
    const totalCountBooks = Number(
        useAppSelector(selectBookListTotalCountBooks)
    )
    const error = useAppSelector(selectBookListError)
    const loading = useAppSelector(selectBookListLoading)
    const { currentPage, onChangePage } = usePaginationBooks(searchLine)

    const { showBoundary } = useErrorBoundary<RejectedDataType>()

    if (!loading && books?.length === 0) {
        return (
            <div className='search-results__info-message'>
                Nothing was found for &quot;<b>{searchLine}</b>&quot;
            </div>
        )
    }

    if (error) showBoundary(error)
    if (loading) return <LoaderBookList numBookLoaders={20} />

    return (
        <div className='search-results _container'>
            <h1 className='search-results__header'>
                You searched for: {searchLine}
            </h1>
            <BookListPagination
                books={books}
                onChangePage={onChangePage}
                totalCountBooks={totalCountBooks}
                currentPage={currentPage}
            />
        </div>
    )
}
