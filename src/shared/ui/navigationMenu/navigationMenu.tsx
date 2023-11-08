import { FC, useCallback } from 'react'

import { IContantNavType } from '../../types/contentNavType'

import './navigationMenu.scss'

interface INavigationMenu {
    content: IContantNavType[]
}

export const NavigationMenu: FC<INavigationMenu> = (props) => {
    const { content } = props

    const renderNavigationContent = useCallback(
        () =>
            content.map((item) => (
                <li key={item.title} className='navigation-menu__item'>
                    {item.title}
                </li>
            )),
        [content]
    )

    return (
        <nav className='navigation-menu'>
            <ul className='navigation-menu__list _container'>
                {renderNavigationContent()}
            </ul>
        </nav>
    )
}
