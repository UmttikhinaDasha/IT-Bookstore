import Bag from 'shared/assets/icons/bag.svg?react'
import Heart from 'shared/assets/icons/heart.svg?react'
import { IconButton } from 'shared/ui/iconButton/iconButton'
import { Search } from 'shared/ui/search/search'

import './header.scss'

export const Header = () => (
    <div className='_container'>
        <div className='header'>
            <h2 className='header__title'>IT Bookstore</h2>
            <Search className='header__search' />
            <div className='header__buttons-wrapper '>
                <IconButton Icon={Heart} />
                <IconButton Icon={Bag} counterTheme='red' />
            </div>
        </div>
    </div>
)
