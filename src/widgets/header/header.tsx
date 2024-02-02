import { Link } from 'react-router-dom'
import Heart from 'shared/assets/icons/heart.svg?react'
import { Dropdown } from 'shared/ui/dropdown/dropdown'
import { IconButton } from 'shared/ui/iconButton/iconButton'
import { Search } from 'shared/ui/search/search'
import { CartPreview } from 'widgets/cartPreview/cartPreview'

import './header.scss'

export const Header = () => (
    <header className='_container'>
        <div className='header'>
            <Link to='/'>
                <h2 className='header__title'>IT Bookstore</h2>
            </Link>
            <Search className='header__search' />
            <div className='header__buttons-wrapper '>
                <Dropdown
                    isArrow
                    labelElement={<IconButton Icon={Heart} />}
                    content={<div>jdjdjd</div>}
                />
                <CartPreview />
            </div>
        </div>
    </header>
)
