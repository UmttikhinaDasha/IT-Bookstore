import Skeleton from 'react-loading-skeleton'

import './loaderBookPreview.scss'

export const LoaderBookPreview = () => {
    return (
        <div className='loader-book-preview'>
            <Skeleton className='loader-book-preview__img' />

            <h4>
                <Skeleton />
            </h4>
            <Skeleton className='loader-book-preview__subtitle' />
            <Skeleton className='loader-book-preview__price' />
        </div>
    )
}
