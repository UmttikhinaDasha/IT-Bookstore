import { TPrice } from 'shared/types/priceType'

export const fromPriceToNumber = (price: TPrice): number => {
    const number = Number(price.slice(1))
    console.log(number)

    return number
}