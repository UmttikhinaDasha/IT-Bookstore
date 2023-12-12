import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import { fetchBookDescription } from 'entities/book/model/bookDescription/bookDescriptionThunk'
import ArrowRight from 'shared/assets/icons/arrowRight.svg?react'
import Bag from 'shared/assets/icons/bag.svg?react'
import Heart from 'shared/assets/icons/heart.svg?react'
import DefaulImageAuthor from 'shared/assets/images/defaultAuthor.png'
import defaultImageBook from 'shared/assets/images/defaultImage.jpg'
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

    useEffect(() => {
        dispatch(fetchBookDescription(bookId))
    }, [bookId])

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
        price,
    } = book

    const onLoadedImage = (): void => {
        setLoadingImage(false)
    }

    return (
        <>
            {loading && <LoaderBookDescription />}

            {!loading && (
                <div className='book-description _container'>
                    <Breadcrumbs />
                    <div className='book-description__content'>
                        {loadingImage && (
                            <LoaderImage height={400} width={300} />
                        )}
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
                            <h3 className='book-description__authors'>
                                {authors}
                            </h3>

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

                            <div className='book-description__wrapper-button'>
                                <Button theme='transparent-grey' Icon={Bag}>
                                    Add to Basket
                                </Button>
                                <Button theme='transparent-grey' Icon={Heart}>
                                    Add to Wishlist
                                </Button>
                            </div>
                        </div>

                        <div className='book-description__wrapper-authors'>
                            <h2 className='book-description__authors-title'>
                                Authors
                            </h2>
                            <div className='book-description__wrapper-authors-names'>
                                <img
                                    src={DefaulImageAuthor}
                                    alt="Author's default."
                                />
                                <h3 className='book-description__authors-names'>
                                    {authors}
                                </h3>
                            </div>
                            <div className='book-description__wrapper-authors-button'>
                                <Button
                                    theme='transparent-grey'
                                    className='book-description__authors-button'>
                                    Read more
                                </Button>
                                <ArrowRight />
                            </div>
                        </div>
                    </div>

                    <div className='book-description__desc'>
                        <Title className='book-description__desc-title'>
                            Description
                        </Title>
                        <p>{desc}</p>
                    </div>
                </div>
            )}
        </>
    )
}
