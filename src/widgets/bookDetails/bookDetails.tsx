import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { Authors } from 'entities/authors/ui'
import { selectBookDescriptionBook } from 'entities/book/bookDescripton/model'
import { AddToCart } from 'features/cart'
import defaultImageBook from 'shared/assets/images/defaultImage.png'
import { PRICE_OF_FREE_BOOK } from 'shared/consts'
import { useAppSelector } from 'shared/lib'
import { LoaderImage } from 'shared/ui/loaders/loaderImage'
import { Price } from 'shared/ui/price'
import { Rating } from 'shared/ui/rating'
import { Title } from 'shared/ui/title'

import './bookDetails.scss'

export const BookDetails = () => {
    const location = useLocation()
    const [loadingImage, setLoadingImage] = useState(true)

    const book = useAppSelector(selectBookDescriptionBook)

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

    const authorsArr = authors.split(', ')

    const linksToAuthors = authorsArr.map((item, index) => (
        <Link
            key={index}
            className='book-details__author'
            to={`/search/${item}`}>
            {item}
        </Link>
    ))

    const actionButtons = (
        <div>
            {price === PRICE_OF_FREE_BOOK ? (
                <a
                    href={url}
                    target='__blank'
                    className='book-details__link-action'>
                    Read a book
                </a>
            ) : (
                <AddToCart
                    bookInfo={{
                        isbn13,
                        image,
                        title,
                        quantity: 1,
                        price,
                        url: location.pathname,
                    }}
                />
            )}
        </div>
    )

    return (
        <div className='book-details'>
            <div className='book-details__content'>
                <div className='book-details__wrapper-image'>
                    {price === PRICE_OF_FREE_BOOK && (
                        <div className='book-details__label-info'>FREE</div>
                    )}

                    {loadingImage && <LoaderImage height={400} width={300} />}
                    <img
                        src={image}
                        loading='lazy'
                        className={clsx(
                            'book-details__image',
                            loadingImage && 'book-details__image_hidden'
                        )}
                        alt='Book cover.'
                        onLoad={onLoadedImage}
                    />
                </div>

                <div className='book-details__info'>
                    <Rating
                        value={Number(rating)}
                        className='book-details__rating'
                    />
                    <h1 className='book-details__title'>{title}</h1>
                    {subtitle && (
                        <h2 className='book-details__subtitle'>{subtitle}</h2>
                    )}
                    <h3 className='book-details__authors'>{linksToAuthors}</h3>

                    <ul className='book-details__info-list'>
                        <li className='book-details__info-item'>
                            Publisher: {publisher}
                        </li>
                        <li className='book-details__info-item'>
                            Published: {year}
                        </li>
                        <li className='book-details__info-item'>
                            Pages: {pages}
                        </li>
                        <li className='book-details__info-item'>
                            ISBN-10: {isbn10}
                        </li>
                        <li className='book-details__info-item'>
                            ISBN-13: {isbn13}
                        </li>
                    </ul>

                    <div className='book-details__price'>
                        Price: <Price>{price}</Price>
                    </div>

                    {actionButtons}
                </div>

                <div className='book-details__wrapper-authors'>
                    <Authors authors={authorsArr} />
                </div>
            </div>

            <div className='book-details__desc'>
                <Title className='book-details__desc-title'>Description</Title>
                <p>
                    {desc}
                    <a
                        href={url}
                        target='_blank'
                        className='book-details__desc-link'
                        rel='noreferrer'>
                        Read more
                    </a>
                </p>
            </div>
        </div>
    )
}
