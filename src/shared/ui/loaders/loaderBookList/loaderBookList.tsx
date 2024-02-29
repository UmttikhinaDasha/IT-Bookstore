import { FC } from 'react'

import { LoaderBookPreview } from '../loaderBookPreview'
import { LoaderBreadcrumbs } from '../loaderBreadcrumbs'

import './loaderBookList.scss'

interface ILoaderBookList {
    /** Number of book loaders to show. */
    numBookLoaders: number
}

export const LoaderBookList: FC<ILoaderBookList> = (props) => {
    const { numBookLoaders } = props

    const renderBooks = () => {
        return [...Array(numBookLoaders)].map((_, index) => (
            <LoaderBookPreview key={index} />
        ))
    }

    return (
        <div className='loader-book-list'>
            <LoaderBreadcrumbs />
            <div className='loader-book-list__content'>{renderBooks()}</div>
        </div>
    )
}
