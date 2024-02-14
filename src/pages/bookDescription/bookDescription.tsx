import { useEffect, useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { Authors } from 'entities/authors/ui/authors'
import { fetchBookDescription } from 'entities/book/model/bookDescription/bookDescriptionThunk'
import { addToCart } from 'features/cart/model/cartSlice'
import Bag from 'shared/assets/icons/bag.svg?react'
import defaultImageBook from 'shared/assets/images/defaultImage.jpg'
import { PRICE_OF_FREE_BOOK } from 'shared/consts/book'
import { SUCCESSFUL_ADDING } from 'shared/consts/notices'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { Breadcrumbs } from 'shared/ui/breadcrumbs/breadcrumbs'
import { Button } from 'shared/ui/button/button'
import { LoaderBookDescription } from 'shared/ui/loaders/loaderBookDescription/loaderBookDescription'
import { LoaderImage } from 'shared/ui/loaders/loaderImage/loaderImage'
import { Price } from 'shared/ui/price/price'
import { Rating } from 'shared/ui/rating/rating'
import { Title } from 'shared/ui/title/title'

import './bookDescription.scss'

export const BookDescription = () => {
    const { bookId } = useParams()
    const location = useLocation()
    const [loadingImage, setLoadingImage] = useState(true)

    const book = useAppSelector(
        (state: RootState) => state.bookDescription.book
    )
    const loading = useAppSelector(
        (state: RootState) => state.bookDescription.loading
    )
    const error = useAppSelector(
        (state: RootState) => state.bookDescription.error
    )
    const dispatch = useAppDispatch()

    const { showBoundary } = useErrorBoundary()

    useEffect(() => {
        if (bookId) dispatch(fetchBookDescription(bookId))
    }, [bookId])

    const onLoadedImage = (): void => {
        setLoadingImage(false)
    }

    const {
        image = defaultImageBook,
        title,
        subtitle,
        authors,
        publisher,
        isbn10,
        isbn13,
        pages,
        year,
        rating,
        desc,
        url,
        price,
    } = book

    const addBookToCart = () => {
        dispatch(
            addToCart({
                isbn13,
                image,
                title,
                quantity: 1,
                price,
                url: location.pathname,
            })
        )
        toast.success(SUCCESSFUL_ADDING)
    }

    const renderActionButtons = () => {
        return (
            <div className='book-description__wrapper-button'>
                {price === PRICE_OF_FREE_BOOK ? (
                    <a
                        href={url}
                        target='__blank'
                        className='book-description__link-action'>
                        Read a book
                    </a>
                ) : (
                    <Button
                        theme='transparent-grey'
                        Icon={Bag}
                        onClick={addBookToCart}>
                        Add to Cart
                    </Button>
                )}
            </div>
        )
    }

    if (error) showBoundary(error)
    if (loading) return <LoaderBookDescription />

    return (
        <div className='book-description _container'>
            <Breadcrumbs />

            <div className='book-description__content'>
                <div className='book-description__wrapper-image'>
                    {price === PRICE_OF_FREE_BOOK && (
                        <div className='book-description__label-info'>FREE</div>
                    )}

                    {loadingImage && <LoaderImage height={400} width={300} />}
                    <img
                        src={image}
                        loading='lazy'
                        className={clsx(
                            'book-description__image',
                            loadingImage && 'book-description__image_hidden'
                        )}
                        alt='Book cover.'
                        onLoad={onLoadedImage}
                    />
                </div>

                <div className='book-description__info'>
                    <Rating
                        value={Number(rating)}
                        className='book-description__rating'
                    />
                    <h1 className='book-description__title'>{title}</h1>
                    {subtitle && (
                        <h2 className='book-description__subtitle'>
                            {subtitle}
                        </h2>
                    )}
                    <h3 className='book-description__authors'>{authors}</h3>

                    <ul className='book-description__info-list'>
                        <li className='book-description__info-item'>
                            Publisher: {publisher}
                        </li>
                        <li className='book-description__info-item'>
                            Published: {year}
                        </li>
                        <li className='book-description__info-item'>
                            Pages: {pages}
                        </li>
                        <li className='book-description__info-item'>
                            ISBN-10: {isbn10}
                        </li>
                        <li className='book-description__info-item'>
                            ISBN-13: {isbn13}
                        </li>
                    </ul>

                    <div className='book-description__price'>
                        Price: <Price>{price}</Price>
                    </div>

                    {renderActionButtons()}
                </div>

                <div className='book-description__wrapper-authors'>
                    <Authors authors={authors} />
                </div>
            </div>

            <div className='book-description__desc'>
                <Title className='book-description__desc-title'>
                    Description
                </Title>
                <p>
                    {desc}
                    <a
                        href={url}
                        target='_blank'
                        className='book-description__desc-link'
                        rel='noreferrer'>
                        Read more
                    </a>
                </p>
            </div>
        </div>
    )
}
