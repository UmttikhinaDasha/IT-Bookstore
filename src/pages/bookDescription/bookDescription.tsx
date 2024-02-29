import { useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import {
    fetchBookDescription,
    selectBookDescriptionError,
    selectBookDescriptionLoading,
} from 'entities/book/bookDescripton/model'
import { useAppDispatch, useAppSelector } from 'shared/lib'
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

    useEffect(() => {
        if (bookId) dispatch(fetchBookDescription(bookId))
    }, [bookId])

    if (error) showBoundary(error)
    if (loading) return <LoaderBookDescription />

    return (
        <div className=' _container'>
            <Breadcrumbs />
            <BookDetails />
        </div>
    )
}
