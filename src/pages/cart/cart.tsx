import { useDispatch } from 'react-redux'
import {
    changeNumItemsInCart,
    removeItemFromCart,
} from 'features/cart/model/cartSlice'
import { fromNumberToPrice } from 'shared/helpers/fromNumberToPrice'
import { fromPriceToNumber } from 'shared/helpers/fromPriceToNumber'
import { useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { Breadcrumbs } from 'shared/ui/breadcrumbs/breadcrumbs'
import { Price } from 'shared/ui/price/price'

import './cart.scss'

export const Cart = () => {
    const cart = useAppSelector((state: RootState) => state.cart.cart)
    const dispatch = useDispatch()

    const totalCost = cart.reduce((sum, current) => {
        return +(
            sum +
            fromPriceToNumber(current.price) * current.quantity
        ).toFixed(2)
    }, 0)

    const increaseQuantity = (isbn13: string, quantity: number) => {
        dispatch(
            changeNumItemsInCart({
                isbn13,
                quantity: quantity + 1,
            })
        )
    }

    const decreaseQuantity = (isbn13: string, quantity: number) => {
        dispatch(
            changeNumItemsInCart({
                isbn13,
                quantity: quantity - 1,
            })
        )
    }

    const removeItem = (isbn13: string) => {
        dispatch(removeItemFromCart({ isbn13 }))
    }

    const renderContent = () => {
        return cart.map((item) => (
            <tr>
                <td className='cart__col cart__col-title'>
                    <img
                        src={item.image}
                        className='cart__img'
                        alt='book cover'
                    />
                    <span className='cart__title'>{item.title}</span>
                </td>
                <td className='cart__col'>
                    <Price className='cart__price'>{item.price}</Price>
                </td>

                <td className='cart__col'>
                    <button
                        type='button'
                        disabled={item.quantity === 1}
                        onClick={() =>
                            decreaseQuantity(item.isbn13, item.quantity)
                        }
                        className='cart__button button_theme_change'>
                        -
                    </button>
                    <span className='cart__quantity'>{item.quantity}</span>
                    <button
                        type='button'
                        onClick={() =>
                            increaseQuantity(item.isbn13, item.quantity)
                        }
                        className='cart__button button_theme_change'>
                        +
                    </button>
                    <button
                        type='button'
                        onClick={() => removeItem(item.isbn13)}
                        className='cart__button button_theme_remove'>
                        &#215;
                    </button>
                </td>
            </tr>
        ))
    }

    return (
        <div className='cart _container'>
            <Breadcrumbs />
            {!cart.length && (
                <span className='cart__elm-empty '>
                    The cart is empty. Add books that interest you here.
                </span>
            )}
            {!!cart.length && (
                <table className='cart__table'>
                    <thead>
                        <tr>
                            <th scope='col' className='cart__col-header'>
                                Product
                            </th>
                            <th scope='col' className='cart__col-header'>
                                Price
                            </th>
                            <th scope='col' className='cart__col-header'>
                                Quantity
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderContent()}</tbody>
                    <tfoot>
                        <tr>
                            <th
                                scope='row'
                                className='cart__col-header cart__col-total'>
                                Total
                            </th>
                            <td className='cart__col-total'>
                                <Price>{fromNumberToPrice(totalCost)}</Price>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    )
}
