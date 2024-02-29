import { FC } from 'react'
import { Link } from 'react-router-dom'
import defaultImage from 'shared/assets/images/defaultImage.jpg'
import { TPrice } from 'shared/types'
import { Price } from 'shared/ui/price'

import './dropdownCartItem.scss'

interface IDropdownCartItem {
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

export const DropdownCartItem: FC<IDropdownCartItem> = (props) => {
    const { image = defaultImage, title, quantity, price, url } = props

    return (
        <Link to={url} className='dropdown-cart-item'>
            <img src={image} alt='' className='dropdown-cart-item__img' />
            <div>
                <h1 className='dropdown-cart-item__title'>{title}</h1>
                <div className='dropdown-cart-item__info'>
                    <span className='dropdown-cart-item__quantity'>
                        {quantity}x
                    </span>
                    <Price className='dropdown-cart-item__price'>{price}</Price>
                </div>
            </div>
        </Link>
    )
}
