import { FC } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { DropdownCartItem, selectCart } from 'entities/cart'
import Bag from 'shared/assets/icons/bag.svg?react'
import { fromPriceToNumber, useAppSelector } from 'shared/lib'
import { Button } from 'shared/ui/button'
import { Dropdown } from 'shared/ui/dropdown'
import { IconButton } from 'shared/ui/iconButton'

import './cartPreview.scss'

interface ICartPreview {
    /** Additional styles. */
    readonly className?: string
}

export const CartPreview: FC<ICartPreview> = (props) => {
    const { className } = props

    const cart = useAppSelector(selectCart)

    const totalCost = cart.reduce(
        (sum, current) =>
            +(
                sum +
                fromPriceToNumber(current.price) * current.quantity
            ).toFixed(2),
        0
    )

    const totalCountItems = cart.reduce(
        (total, current) => total + current.quantity,
        0
    )

    const renderItems = () => {
        return cart?.map((item) => (
            <DropdownCartItem
                key={item.isbn13}
                title={item.title}
                image={item.image}
                quantity={item.quantity}
                price={item.price}
                url={item.url}
            />
        ))
    }

    // TODO: memo
    const renderContent = (
        <div className='cart-preview__content'>
            <div className='cart-preview__books'>{renderItems()}</div>
            <div className='cart-preview__price'>
                Subtotal <span>${totalCost}</span>
            </div>
            <div className='cart-preview__footer'>
                <Link to='/cart'>
                    <Button className='cart-preview__button'>View Cart</Button>
                </Link>
            </div>
        </div>
    )

    return (
        <div className={clsx('cart-preview', className)}>
            <Dropdown
                isArrow
                labelElement={
                    <IconButton
                        Icon={Bag}
                        counterTheme='red'
                        counterValue={totalCountItems}
                    />
                }
                content={renderContent}
            />
        </div>
    )
}
