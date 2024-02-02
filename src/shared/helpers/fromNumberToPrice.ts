import { TPrice } from 'shared/types/priceType'

export const fromNumberToPrice = (number: number): TPrice => {
    const [mainPart = 0, restPart = 0] = String(number).split('.')

    return `$${mainPart}.${restPart}`
}
