import { FallingLines } from 'react-loader-spinner'

import './loaderCarousel.scss'

const PRIMARY_BG = '#2699fb'

export const LoaderCarousel = () => {
    return (
        <div className='loader-carousel'>
            <FallingLines width='100' color={PRIMARY_BG} />
        </div>
    )
}
