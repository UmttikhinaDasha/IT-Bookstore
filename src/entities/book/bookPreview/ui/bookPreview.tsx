import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { IBookPreview } from 'shared/api'
import defaultImage from 'shared/assets/images/defaultImage.png'
import { PRICE_OF_FREE_BOOK } from 'shared/consts'
import { LoaderImage } from 'shared/ui/loaders/loaderImage'
import { Price } from 'shared/ui/price'

import './bookPreview.scss'

interface IBookPreviewProps extends IBookPreview {
    /** Slot for adding an action button. */
    readonly actionSlot: JSX.Element
}

export const BookPreview: FC<IBookPreviewProps> = (props) => {
    const {
        isbn13,
        image = defaultImage,
        title,
        subtitle,
        price,
        className,
        actionSlot,
    } = props

    const [loadingImage, setLoadingImage] = useState(true)

    const LINK_TO_BOOK_DESCRIPTION = `/books/description/${isbn13}`

    const onLoadedImage = (): void => {
        setLoadingImage(false)
    }

    const renderOverlay = (): JSX.Element => (
        <div className='book-preview__overlay'>
            <Price className='book-preview__price'>{price}</Price>
            <Link to={LINK_TO_BOOK_DESCRIPTION}>
                <h4 className='book-preview__title'>{title}</h4>
                <span className='book-preview__author'>{subtitle}</span>
            </Link>

            {actionSlot}
        </div>
    )

    return (
        <div className={clsx('book-preview', className)}>
            <div className='book-preview__panel'>
                {price === PRICE_OF_FREE_BOOK && (
                    <div className='book-preview__label-info'>FREE</div>
                )}
            </div>

            <Link to={LINK_TO_BOOK_DESCRIPTION}>
                {loadingImage && (
                    <LoaderImage className='book-preview__image-loader' />
                )}
                <img
                    src={image}
                    loading='lazy'
                    className={clsx(
                        'book-preview__image',
                        loadingImage && 'book-preview__image_hidden'
                    )}
                    alt='Book cover.'
                    onLoad={onLoadedImage}
                />
            </Link>

            <h4 className='book-preview__title'>{title}</h4>
            <span className='book-preview__author'>{subtitle}</span>
            <Price>{price}</Price>

            {renderOverlay()}
        </div>
    )
}
