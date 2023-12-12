import { FC } from 'react'
import clsx from 'clsx'

import './loaderImage.scss'

interface ILoaderImage {
    /** The width of the image loader. */
    width?: number
    /** The height of the image loader. */
    height?: number
    /** Additional styles. */
    className?: string
}

export const LoaderImage: FC<ILoaderImage> = (props) => {
    const { width = 250, height = 290, className } = props

    return (
        <div
            style={{ width, height }}
            className={clsx('loader-image', className)}>
            <div className='loader-image__placeholder' />
        </div>
    )
}
