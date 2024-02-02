import { FC } from 'react'
import { Link } from 'react-router-dom'
import defaultImage from 'shared/assets/images/defaultImage.jpg'
import { TPrice } from 'shared/types/priceType'

import { Price } from '../price/price'

import './dropdownContentItem.scss'

interface IDropdownContentItem {
    /** Product image. */
    readonly image?: string
    /** Product Name. */
    readonly title: string
    /** Number of added product units. */
    readonly quantity: number
    /** Total price. */
    readonly price: TPrice
    /** Link to the product. */
    readonly url: string
}

export const DropdownContentItem: FC<IDropdownContentItem> = (props) => {
    const { image = defaultImage, title, quantity, price, url } = props

    return (
        <Link to={url} className='dropdown-content-item'>
            <img src={image} alt='' className='dropdown-content-item__img' />
            <div>
                <h1 className='dropdown-content-item__title'>{title}</h1>
                <div className='dropdown-content-item__info'>
                    <span className='dropdown-content-item__quantity'>
                        {quantity}x
                    </span>
                    <Price className='dropdown-content-item__price'>
                        {price}
                    </Price>
                </div>
            </div>
        </Link>
    )
}
