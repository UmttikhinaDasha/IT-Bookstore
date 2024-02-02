import { FC, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import Bag from 'shared/assets/icons/bag.svg?react'

import { IContantNavType } from '../../types/contentNavType'
import { IconButton } from '../iconButton/iconButton'

import './navigationMenu.scss'

interface INavigationMenu {
    /** Items that will be shown in the menu. */
    readonly content: IContantNavType[]
    /** Value indicating whether the menu is sticky at the top of the screen. */
    readonly isSticky?: boolean
    /** Additional styles. */
    readonly className?: string
}

export const NavigationMenu: FC<INavigationMenu> = (props) => {
    const { content, isSticky = false, className } = props

    const getClassNamesNavLink = (isActive: boolean): string => {
        return [
            'navigation-menu__link',
            isActive && 'navigation-menu__link_active',
        ].join(' ')
    }

    const renderNavigationContent = useCallback(
        () =>
            content.map((item) => (
                <li key={item.title} className='navigation-menu__item'>
                    <NavLink
                        to={item.link}
                        end
                        className={({ isActive }) =>
                            getClassNamesNavLink(isActive)
                        }>
                        {item.title}
                    </NavLink>
                </li>
            )),
        [content]
    )

    return (
        <nav
            className={clsx(
                'navigation-menu',
                isSticky && 'navigation-menu_sticky',
                className
            )}>
            <div className='navigation-menu__content-wrapper _container'>
                <ul className='navigation-menu__list'>
                    {renderNavigationContent()}
                </ul>

                <div className='navigation-menu__buttons-wrapper '>
                    <IconButton
                        Icon={Bag}
                        counterTheme='red'
                        className='navigation-menu__button'
                    />
                </div>
            </div>
        </nav>
    )
}
