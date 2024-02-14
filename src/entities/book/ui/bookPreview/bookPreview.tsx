import { FC, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { addToCart } from 'features/cart/model/cartSlice'
import Bag from 'shared/assets/icons/bag.svg?react'
import defaultImage from 'shared/assets/images/defaultImage.jpg'
import { PRICE_OF_FREE_BOOK } from 'shared/consts/book'
import { SUCCESSFUL_ADDING } from 'shared/consts/notices'
import { useAppDispatch } from 'shared/hooks/redux'
import { IBookPreview } from 'shared/types/bookType'
import { Button } from 'shared/ui/button/button'
import { LoaderImage } from 'shared/ui/loaders/loaderImage/loaderImage'
import { Price } from 'shared/ui/price/price'

import './bookPreview.scss'

export const BookPreview: FC<IBookPreview> = (props) => {
    const {
        isbn13,
        image = defaultImage,
        title,
        subtitle,
        price,
        className,
    } = props

    const [loadingImage, setLoadingImage] = useState(true)
    const dispatch = useAppDispatch()

    const LINK_TO_BOOK_DESCRIPTION = `/books/description/${isbn13}`

    const onLoadedImage = (): void => {
        setLoadingImage(false)
    }

    const addBookToCart = () => {
        dispatch(
            addToCart({
                isbn13,
                image,
                title,
                quantity: 1,
                price,
                url: LINK_TO_BOOK_DESCRIPTION,
            })
        )
        toast.success(SUCCESSFUL_ADDING)
    }

    const renderOverlay = (): JSX.Element => (
        <div className='book-preview__overlay'>
            <Price className='book-preview__price'>{price}</Price>
            <Link to={LINK_TO_BOOK_DESCRIPTION}>
                <h4 className='book-preview__title'>{title}</h4>
                <span className='book-preview__author'>{subtitle}</span>
            </Link>

            <Button
                onClick={addBookToCart}
                Icon={Bag}
                theme='transparent-blue'
                className='book-preview__button-add'>
                Add to Cart
            </Button>
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
