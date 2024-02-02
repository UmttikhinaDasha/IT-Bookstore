import { FC } from 'react'
import clsx from 'clsx'

import './dropdown.scss'

interface IDropdown {
    /** Element under which the dropdown will open. */
    readonly labelElement: JSX.Element
    /** Dropdown content. */
    readonly content: JSX.Element
    /** If the dropdown has an arrow at the top. */
    readonly isArrow?: boolean
}

export const Dropdown: FC<IDropdown> = (props) => {
    const { labelElement, content, isArrow = false } = props

    return (
        <div className={clsx('dropdown', isArrow && 'dropdown_with-arrow')}>
            <div className='dropdown__label'>{labelElement}</div>
            <div className='dropdown__wrapper_content'>
                <div className='dropdown__content'>{content}</div>
            </div>
        </div>
    )
}
