import { useParams } from 'react-router-dom'
import { BookCategoryPagination } from 'widgets/bookСategoryPagination/bookCategoryPagination'

import './books.scss'

export const Books = () => {
    const { categoryId } = useParams()

    return (
        <div className='books _container'>
            <BookCategoryPagination id={categoryId} />
        </div>
    )
}
