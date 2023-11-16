import { BookCategoryPagination } from 'widgets/bookСategoryPagination/bookCategoryPagination'

import './books.scss'

export const Books = () => {
    return (
        <div className='books _container'>
            <BookCategoryPagination />
        </div>
    )
}
