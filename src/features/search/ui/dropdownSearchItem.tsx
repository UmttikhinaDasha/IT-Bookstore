import { FC } from 'react'
import { Link } from 'react-router-dom'
import defaultImage from 'shared/assets/images/defaultImage.jpg'

import './dropdownSearchItem.scss'

interface IDropdownSearchItem {
    /** Product image. */
    readonly image?: string
    /** Product Name. */
    readonly title: string
    /** Product subtitle. */
    readonly subtitle: string
    /** Link to the product. */
    readonly url: string
}

export const DropdownSearchItem: FC<IDropdownSearchItem> = (props) => {
    const { image = defaultImage, title, subtitle, url } = props

    return (
        <Link to={url} className='dropdown-search-item'>
            <img
                src={image}
                className='dropdown-search-item__image'
                alt='Book cover.'
            />
            <div className='ropdown-search-item__content-wrapper'>
                <h1 className='dropdown-search-item__title'>{title}</h1>
                <h2 className='dropdown-search-item__subtitle'>{subtitle}</h2>
            </div>
        </Link>
    )
}
