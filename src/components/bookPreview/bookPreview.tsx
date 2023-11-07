import { FC } from 'react'
import clsx from 'clsx'

import Bag from '@/assets/icons/bag.svg?react'
import Heart from '@/assets/icons/heart.svg?react'
import defaultImage from '@/assets/images/defaultImage.jpg'
import { IBookPreview } from '@/types/bookType'

import { Button } from '../button/button'
import { Price } from '../price/price'

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

    const renderOverlay = (): JSX.Element => (
        <div className='book-preview__overlay'>
            <Price className='book-preview__price'>{price}</Price>
            <h4 className='book-preview__title'>{title}</h4>
            <span className='book-preview__author'>{subtitle}</span>

            <Button
                Icon={Bag}
                theme='transparent-blue'
                className='book-preview__button-add'>
                Add to Basket
            </Button>
        </div>
    )

    return (
        <div className={clsx('book-preview', className)}>
            <div className='book-preview__panel'>
                <button
                    type='button'
                    className='book-preview__button-heart'
                    onClick={() => {
                        console.log('')
                    }}
                    aria-label='add wishlist'>
                    <Heart />
                </button>
            </div>
            <img
                src={image}
                className='book-preview__image'
                alt='Book cover.'
            />

            <h4 className='book-preview__title'>{title}</h4>
            <span className='book-preview__author'>{subtitle}</span>
            <Price>{price}</Price>

            {renderOverlay()}
        </div>
    )
}
