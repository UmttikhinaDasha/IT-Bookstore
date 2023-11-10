import { FC, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'

import './carousel.scss'
import 'react-alice-carousel/lib/alice-carousel.css'

interface ICarousel {
    /** List of elements for the carousel. */
    readonly items: JSX.Element[]
}

const responsive = {
    1024: { items: 5 },
}

export const Carousel: FC<ICarousel> = (props) => {
    const { items } = props

    const [activeIndex, setActiveIndex] = useState<number>(0)

    const countVisibleElements = 5
    const minActiveIndexElement = 0
    const maxActiveIndexElement = items.length - countVisibleElements

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
        <div className='carusel'>
            <AliceCarousel
                autoWidth
                mouseTracking
                keyboardNavigation
                activeIndex={activeIndex}
                items={items}
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
