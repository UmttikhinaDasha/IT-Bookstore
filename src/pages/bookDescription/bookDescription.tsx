import { useEffect, useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import {
    fetchBookDescription,
    selectBookDescriptionError,
    selectBookDescriptionLoading,
} from 'entities/book/bookDescripton/model'
import { useAppDispatch, useAppSelector, usePrevious } from 'shared/lib'
import { Breadcrumbs } from 'shared/ui/breadcrumbs'
import { LoaderBookDescription } from 'shared/ui/loaders/loaderBookDescription'
import { BookDetails } from 'widgets/bookDetails'

import './bookDescription.scss'

export const BookDescription = () => {
    const { bookId } = useParams()
    const loading = useAppSelector(selectBookDescriptionLoading)
    const error = useAppSelector(selectBookDescriptionError)
    const dispatch = useAppDispatch()
    const { showBoundary } = useErrorBoundary()

    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const prevLoading = usePrevious(loading)

    useEffect(() => {
        if (bookId) dispatch(fetchBookDescription(bookId))
    }, [bookId])

    if (prevLoading === true && loading === false && isFirstLoad) {
        setIsFirstLoad(false)
    }

    if (loading) return <LoaderBookDescription />
    if (error && !isFirstLoad) {
        showBoundary(error)
    }

    return (
        <div className='book-description _container'>
            <Breadcrumbs />
            <BookDetails />
        </div>
    )
}
