import { FC } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Bag from 'shared/assets/icons/bag.svg?react'
import { fromPriceToNumber } from 'shared/helpers/fromPriceToNumber'
import { useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { Button } from 'shared/ui/button/button'
import { Dropdown } from 'shared/ui/dropdown/dropdown'
import { DropdownContentItem } from 'shared/ui/dropdownContentItem/dropdownContentItem'
import { IconButton } from 'shared/ui/iconButton/iconButton'

import './cartPreview.scss'

interface ICartPreview {
    /** Additional styles. */
    readonly className?: string
}

export const CartPreview: FC<ICartPreview> = (props) => {
    const { className } = props

    const cart = useAppSelector((state: RootState) => state.cart.cart)

    const totalCost = cart.reduce((sum, current) => {
        return +(
            sum +
            fromPriceToNumber(current.price) * current.quantity
        ).toFixed(2)
    }, 0)

    const totalCountItems = cart.length

    const renderItems = () => {
        return cart?.map((item) => (
            <DropdownContentItem
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
                <Button
                    theme='transparent-grey'
                    className='cart-preview__button'>
                    Checkout
                </Button>
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
