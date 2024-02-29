import { TPrice } from 'shared/types'

export const fromPriceToNumber = (price: TPrice): number => {
    const number = Number(price.slice(1))

    return number
}

export const fromNumberToPrice = (number: number): TPrice => {
    const [mainPart = 0, restPart = 0] = String(number).split('.')

    return `$${mainPart}.${restPart}`
}
