import { Link } from 'react-router-dom'
import { CartPreview } from 'widgets/cartPreview/cartPreview'
import { Search } from 'widgets/search/search'

import './header.scss'

export const Header = () => (
    <header className='_container'>
        <div className='header'>
            <Link to='/'>
                <h2 className='header__title'>IT Bookstore</h2>
            </Link>
            <Search className='header__search' />
            <div className='header__buttons-wrapper '>
                <CartPreview />
            </div>
        </div>
    </header>
)
