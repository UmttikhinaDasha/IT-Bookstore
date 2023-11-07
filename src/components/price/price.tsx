import { FC, useCallback } from 'react'
import clsx from 'clsx'

import { TPrice } from '../../types/priceType'

import './price.scss'

interface IPrice {
    children: TPrice
    className?: string
}

export const Price: FC<IPrice> = (props) => {
    const { children, className } = props

    const renderPrice = useCallback((): JSX.Element => {
        const [mainPart, restPart] = children.split('.')

        return (
            <p className={clsx('price', className)}>
                {mainPart}
                <sup>.{restPart}</sup>
            </p>
        )
    }, [children, className])

    return renderPrice()
}
