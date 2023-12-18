import { FC } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import { BookPreview } from 'entities/book/ui/bookPreview/bookPreview'
import { IBookPreview } from 'shared/types/bookType'

import './bookCategoryPagination.scss'
import 'react-responsive-pagination/themes/classic.css'

interface IBookCategoryPagination {
    books: IBookPreview[] | null
    onChangePage: (newPage: number) => void
    totalCountBooks: number
    currentPage: number
}

export const BookCategoryPagination: FC<IBookCategoryPagination> = (props) => {
    const { books, onChangePage, totalCountBooks, currentPage } = props
    const totalPage = Math.ceil(totalCountBooks / 20)

    const renderBooks = (items: IBookPreview[] | null) => {
        return items?.map((item) => (
            <BookPreview
                key={item.isbn13}
                isbn13={item.isbn13}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
            />
        ))
    }
    return (
        <div className='book-category-pagination'>
            <div className='book-category-pagination__content'>
                {renderBooks(books)}
            </div>
            <ResponsivePagination
                current={currentPage}
                total={totalPage}
                onPageChange={onChangePage}
                maxWidth={500}
            />
        </div>
    )
}
