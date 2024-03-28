import { FC } from 'react'
import { toast } from 'react-toastify'
import { addToCart, ICartItem } from 'entities/cart'
import Bag from 'shared/assets/icons/bag.svg?react'
import { SUCCESSFUL_ADDING } from 'shared/consts'
import { useAppDispatch } from 'shared/lib'
import { Button } from 'shared/ui/button'

interface IAddToCart {
    /** Book information to add to cart. */
    readonly bookInfo: ICartItem
    /** Additional styles. */
    readonly className?: string
}

export const AddToCart: FC<IAddToCart> = (props) => {
    const { bookInfo, className } = props
    const dispatch = useAppDispatch()

    const addBookToCart = () => {
        dispatch(addToCart(bookInfo))
        toast.success(SUCCESSFUL_ADDING)
    }

    return (
        <Button
            theme='transparent-grey'
            Icon={Bag}
            onClick={addBookToCart}
            className={className}>
            Add to Cart
        </Button>
    )
}
