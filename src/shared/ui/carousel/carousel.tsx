import { FC, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import clsx from 'clsx'

import './carousel.scss'
import 'react-alice-carousel/lib/alice-carousel.css'

interface ICarousel {
    /** List of elements for the carousel. */
    readonly children: JSX.Element[] | Element[]
    /** The number of visible elements in the carousel. Default 1. */
    readonly countVisibleElements?: number
    /** Additional styles. */
    readonly className?: string
}

const responsive = {
    1024: { items: 5 },
}

export const Carousel: FC<ICarousel> = (props) => {
    const { children, countVisibleElements = 1, className } = props

    const [activeIndex, setActiveIndex] = useState<number>(0)

    const minActiveIndexElement = 0
    const maxActiveIndexElement = children?.length
        ? children.length - countVisibleElements
        : 0

    const isDisabledSlidePrev = activeIndex <= minActiveIndexElement
    const isDisabledSlideNext = activeIndex >= maxActiveIndexElement

    const getSlidePrev = () => {
        if (isDisabledSlidePrev) {
            return
        }
        setActiveIndex(activeIndex - 1)
    }

    const getSlideNext = () => {
        if (isDisabledSlideNext) {
            return
        }
        setActiveIndex(activeIndex + 1)
    }

    return (
        <div className={clsx('carousel', className)}>
            <AliceCarousel
                autoWidth
                mouseTracking
                keyboardNavigation
                activeIndex={activeIndex}
                items={children}
                responsive={responsive}
                disableButtonsControls
                disableDotsControls
            />
            <button
                type='button'
                className='btn-prev'
                onClick={getSlidePrev}
                disabled={isDisabledSlidePrev}>
                &lang;
            </button>
            <button
                type='button'
                className='btn-next'
                onClick={getSlideNext}
                disabled={isDisabledSlideNext}>
                &rang;
            </button>
        </div>
    )
}
