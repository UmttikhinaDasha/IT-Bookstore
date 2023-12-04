import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Button } from 'shared/ui/button/button'
import { Title } from 'shared/ui/title/title'

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

    const navigate = useNavigate()

    const goToCategoryPage = (): void => {
        navigate(`/categories/${title}`)
    }

    return (
        <div className={clsx('product-category _container', className)}>
            <div className='product-category__header'>
                <Title>{title}</Title>

                <Button theme='transparent-grey' onClick={goToCategoryPage}>
                    SEE MORE
                </Button>
            </div>
            {children}
        </div>
    )
}
