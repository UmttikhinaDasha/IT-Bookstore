import { FC } from 'react'

import ArrowRight from '../../assets/icons/arrowRight.svg?react'
import Bag from '../../assets/icons/bag.svg?react'
import Heart from '../../assets/icons/heart.svg?react'
import DefaulImageAuthor from '../../assets/images/defaultAuthor.png'
import defaultImageBook from '../../assets/images/defaultImage.jpg'
import { Button } from '../../components/button/button'
import { Price } from '../../components/price/price'
import { Rating } from '../../components/rating/rating'
import { Title } from '../../components/title/title'
import { IBookDescription } from '../../types/bookType'

import './bookDescription.scss'

export const BookDescription: FC<IBookDescription> = (props) => {
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
    } = props

    return (
        <div className='book-description _container'>
            <div className='book-description__content'>
                <img
                    src={image}
                    alt='Book cover.'
                    className='book-description__image'
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

                    <p className='book-description__price'>
                        Price: <Price>{price}</Price>
                    </p>

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
                    <h2 className='book-description__authors-title'>Authors</h2>
                    <div className='book-description__wrapper-authors-names'>
                        <img src={DefaulImageAuthor} alt="Author's default." />
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
    )
}
