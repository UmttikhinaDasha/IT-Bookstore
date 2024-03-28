import { FC } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ISlides } from 'shared/types'
import { Carousel } from 'shared/ui/carousel'

import './slider.scss'

interface ISleder {
    /** Slide collection. */
    readonly slides: ISlides[]
    /** Additional styles. */
    readonly className?: string
}

export const Slider: FC<ISleder> = (props) => {
    const { slides, className } = props

    const slideImages = slides.map((item) => (
        <Link key={item.img} to={item.url}>
            <img src={item.img} alt={item.alt} className='slider__item' />
        </Link>
    ))

    return (
        <div className='slider__wrapper'>
            <Carousel className={clsx('slider', className)}>
                {slideImages}
            </Carousel>
        </div>
    )
}
