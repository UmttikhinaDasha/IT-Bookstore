import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPrice } from 'shared/types/priceType'

interface ICartItem {
    /** 13 digit edition identifier. */
    readonly isbn13: string
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

const initialState: { cart: ICartItem[] } = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const findItemIndex = state.cart?.findIndex(
                (item) => item.isbn13 === action.payload.isbn13
            )

            if (findItemIndex === -1) {
                state.cart = [action.payload, ...state.cart]
                return state
            }

            state.cart[findItemIndex].quantity += action.payload.quantity
            return state
        },
        changeNumItemsInCart: (
            state,
            action: PayloadAction<{ isbn13: string; quantity: number }>
        ) => {
            const findItemIndex = state.cart?.findIndex(
                (item) => item.isbn13 === action.payload.isbn13
            )

            state.cart[findItemIndex].quantity = action.payload.quantity
        },
        removeItemFromCart: (
            state,
            action: PayloadAction<{ isbn13: string }>
        ) => {
            state.cart = state.cart.filter(
                (item) => item.isbn13 !== action.payload.isbn13
            )

            return state
        },
    },
})

export const { addToCart, changeNumItemsInCart, removeItemFromCart } =
    cartSlice.actions
export default cartSlice.reducer
