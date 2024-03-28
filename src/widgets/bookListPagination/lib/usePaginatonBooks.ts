import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
    clearBookListStore,
    fetchBookList,
    selectBookListTotalCountBooks,
} from 'entities/book/bookList'
import { NUMBER_OF_RETURNED_API_ELEMENTS } from 'shared/consts'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux'

interface UsePaginatonBooksResults {
    readonly currentPage: number
    readonly onChangePage: (newPage: number) => void
}

/**
 * Hook allows you to load books page by page.
 * @param searchLine The line by which the request will be made to obtain books.
 * @returns Current page and function to change current page.
 */
export const usePaginationBooks = (
    searchLine?: string
): UsePaginatonBooksResults => {
    const [searchParams, setSearchParams] = useSearchParams({ page: '1' })
    const currentPage = Number(searchParams.get('page')) || 1

    const totalCountBooks = Number(
        useAppSelector(selectBookListTotalCountBooks)
    )
    const dispatch = useAppDispatch()

    const onChangePage = (newPage: number): void => {
        const page = newPage.toString() || '1'

        setSearchParams({ page })
    }

    const getData = (newPage: number): void => {
        const isAccessiblePage =
            Math.ceil(totalCountBooks / NUMBER_OF_RETURNED_API_ELEMENTS) >=
            newPage * 2

        if (searchLine) {
            dispatch(
                fetchBookList({
                    search: searchLine,
                    page: newPage * 2 - 1,
                })
            )
            /** If there is more data, then we make a repeated request
             *  so that 20 books are displayed on the page. */
            if (totalCountBooks === 0 || isAccessiblePage) {
                dispatch(
                    fetchBookList({
                        search: searchLine,
                        page: newPage * 2,
                    })
                )
            }
        }
    }

    if (Number.isNaN(Number(searchParams.get('page')))) {
        onChangePage(1)
    }

    useEffect(() => {
        let ignore = false

        async function startFetching() {
            await dispatch(clearBookListStore())
            if (!ignore) {
                getData(currentPage)
            }
        }

        startFetching()
        return () => {
            ignore = true
        }
    }, [currentPage, searchLine])

    return { currentPage, onChangePage }
}
