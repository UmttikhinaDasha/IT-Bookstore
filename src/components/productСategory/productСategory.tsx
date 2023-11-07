import { FC } from 'react'
import clsx from 'clsx'

import { Button } from '../button/button'
import { Title } from '../title/title'

import './productCategory.scss'

interface IProductСategory {
    /** Product category name. */
    readonly title: string
    /** Category content. */
    readonly children: JSX.Element
    /** Additional styles. */
    readonly className?: string
}

export const ProductСategory: FC<IProductСategory> = (props) => {
    const { title, children, className } = props
    return (
        <div className={clsx('product-category _container', className)}>
            <div className='product-category__header'>
                <Title>{title}</Title>

                <Button theme='transparent-grey'>SEE MORE</Button>
            </div>
            {children}
        </div>
    )
}
