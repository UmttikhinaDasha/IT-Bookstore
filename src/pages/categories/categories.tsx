import { Link } from 'react-router-dom'
import { CATEGORIES } from 'shared/consts'
import { ICategoryItem, TCategories } from 'shared/types'
import { Breadcrumbs } from 'shared/ui/breadcrumbs'
import { Title } from 'shared/ui/title'

import './categories.scss'

export const Categories = () => {
    const categoryСontent = (values: ICategoryItem[]): JSX.Element => (
        <div className='categories__content-list'>
            {values.map((item) => (
                <Link
                    key={item.title}
                    to={item.link}
                    className='categories__content-item'>
                    {item.title}
                </Link>
            ))}
        </div>
    )

    const renderCategories = (categories: TCategories): JSX.Element[] =>
        Object.entries(categories).map(([key, values]) => (
            <div key={key} className='categories__container-category'>
                <Title className='categories__title'>{key}</Title>
                {categoryСontent(values)}
            </div>
        ))

    return (
        <div className='categories _container'>
            <Breadcrumbs />
            <div className='categories__list'>
                {renderCategories(CATEGORIES)}
            </div>
        </div>
    )
}
