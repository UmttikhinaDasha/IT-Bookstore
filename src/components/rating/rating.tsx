import { FC } from 'react'
import { Rating as ReactRating, Star } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

interface IRating {
    /** Rating value. */
    readonly value: number
    /** The maximum width of the component. */
    readonly maxWidth?: number
    /** Additional styles. */
    readonly className?: string
}

const ratingStyles = {
    itemShapes: Star,
    activeFillColor: '#f59e0b',
    inactiveFillColor: '#ffedd5',
}

export const Rating: FC<IRating> = (props) => {
    const { value, maxWidth = 110, className } = props

    return (
        <ReactRating
            style={{ maxWidth }}
            value={value}
            itemStyles={ratingStyles}
            readOnly
            className={className}
        />
    )
}
