import { Title } from '../../components/title/title'
import { CATEGORIES } from '../../consts/categories'
import { ICategoryItem, TCategories } from '../../types/categoriesType'

import './categories.scss'

export const Categories = () => {
    const categoryСontent = (values: ICategoryItem[]): JSX.Element => (
        <div className='categories__content-list'>
            {values.map((item) => (
                <a
                    key={item.title}
                    href={item.value}
                    className='categories__content-item'>
                    {item.title}
                </a>
            ))}
        </div>
    )

    const renderCategories = (categories: TCategories): JSX.Element[] =>
        Object.entries(categories).map(([key, values]) => (
            <>
                <Title className='categories__title'>{key}</Title>
                {categoryСontent(values)}
            </>
        ))

    return (
        <div className='categories _container'>
            {renderCategories(CATEGORIES)}
        </div>
    )
}
