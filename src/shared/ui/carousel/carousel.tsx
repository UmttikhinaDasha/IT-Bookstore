import { FC, useState } from 'react'
import AliceCarousel, { Responsive } from 'react-alice-carousel'
import clsx from 'clsx'

import './carousel.scss'
import 'react-alice-carousel/lib/alice-carousel.css'

interface ICarousel {
    /** List of elements for the carousel. */
    readonly children: JSX.Element[] | Element[]
    /** The number of visible elements in the carousel. Default 1. */
    readonly countVisibleElements?: number
    readonly autoWidth?: boolean
    readonly responsive?: Responsive
    readonly disableDotsControls?: boolean
    /** Additional styles. */
    readonly className?: string
}

export const Carousel: FC<ICarousel> = (props) => {
    const {
        children,
        countVisibleElements = 1,
        autoWidth,
        responsive,
        disableDotsControls,
        className,
    } = props

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
                autoWidth={autoWidth}
                mouseTracking
                responsive={responsive}
                activeIndex={activeIndex}
                items={children}
                disableButtonsControls
                disableDotsControls={disableDotsControls}
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
