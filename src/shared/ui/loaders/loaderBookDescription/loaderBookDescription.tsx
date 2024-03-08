import { PropsWithChildren } from 'react'

import { LoaderBreadcrumbs } from '../loaderBreadcrumbs'
import { Skeleton } from '../skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
import './loaderBookDescription.scss'

function StarWrapper({ children }: PropsWithChildren<unknown>) {
    return (
        <div
            style={{
                display: 'inline-block',
                clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                width: '22px',
                height: '22px',
            }}>
            {children}
        </div>
    )
}

export const LoaderBookDescription = () => {
    return (
        /*   <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fcfcfc'> */
        <div className='loader-book-description _container'>
            <LoaderBreadcrumbs />
            <div className='loader-book-description__content'>
                <Skeleton className='loader-book-description__img' />

                <div className='loader-book-description__info'>
                    <Skeleton
                        count={5}
                        wrapper={StarWrapper}
                        height='100%'
                        duration={0.9}
                    />
                    <h1>
                        <Skeleton />
                    </h1>
                    <h2>
                        <Skeleton />
                    </h2>
                    <h3>
                        <Skeleton />
                    </h3>

                    <div className='loader-book-description__info-list'>
                        <Skeleton count={5} height={14} />
                    </div>

                    <div className='loader-book-description__price'>
                        Price: <Skeleton width={60} height={40} />
                    </div>

                    <div className='loader-book-description__wrapper-button'>
                        <Skeleton className='loader-book-description__button' />
                        <Skeleton className='loader-book-description__button' />
                    </div>
                </div>

                <div className='loader-book-description__wrapper-authors'>
                    <Skeleton className='loader-book-description__authors' />
                </div>
            </div>

            <div className='loader-book-description__desc'>
                <h1 className='loader-book-description__desc-title'>
                    <Skeleton />
                </h1>

                <p>
                    <Skeleton count={6} />
                </p>
            </div>
        </div>
    )
}
