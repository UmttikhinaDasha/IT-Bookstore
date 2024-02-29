import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { clearBookListStore, fetchBookList } from 'entities/book/bookList/model'

import { useAppDispatch } from './redux'

/**
 * Hook allows you to load books page by page.
 * @param searchLine The line by which the request will be made to obtain books.
 * @returns Current page and function to change current page.
 */
export const usePaginationBooks = (searchLine?: string) => {
    const [searchParams, setSearchParams] = useSearchParams({ page: '1' })
    const currentPage = Number(searchParams.get('page')) || 1

    const dispatch = useAppDispatch()

    const onChangePage = (newPage: number): void => {
        const page = newPage.toString() || '1'
        setSearchParams({ page })
    }

    const getData = (newPage: number): void => {
        /** Getting books for two pages. */
        if (searchLine) {
            dispatch(
                fetchBookList({
                    search: searchLine,
                    page: newPage * 2 - 1,
                })
            )
            dispatch(
                fetchBookList({
                    search: searchLine,
                    page: newPage * 2,
                })
            )
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
