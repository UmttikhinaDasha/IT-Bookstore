import { FC } from 'react'

import { LoaderBookPreview } from '../loaderBookPreview/loaderBookPreview'
import { LoaderBreadcrumbs } from '../loaderBreadcrumbs/loaderBreadcrumbs'

import './loaderCategory.scss'

interface ILoaderCategory {
    /** Number of book loaders to show. */
    numBookLoaders: number
}

export const LoaderCategory: FC<ILoaderCategory> = (props) => {
    const { numBookLoaders } = props

    const renderBooks = () => {
        return [...Array(numBookLoaders)].map((_, index) => (
            <LoaderBookPreview key={index} />
        ))
    }

    return (
        <div className='loader-category'>
            <LoaderBreadcrumbs />
            <div className='loader-category__content'>{renderBooks()}</div>
        </div>
    )
}
