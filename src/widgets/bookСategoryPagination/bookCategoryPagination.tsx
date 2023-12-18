import { FC } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import clsx from 'clsx'
import { BookPreview } from 'entities/book/ui/bookPreview/bookPreview'
import { IBookPreview } from 'shared/types/bookType'

import './bookCategoryPagination.scss'

interface IBookCategoryPagination {
    /** Books for rendering on the page. */
    books: IBookPreview[] | null
    /** Total book count for all pages. */
    totalCountBooks: number
    /** Current active page. */
    currentPage: number
    /** Additional styles. */
    className?: string

    /**
     * Books for drawing on the page.
     * @param newPage - The page to go to.
     *  */
    onChangePage: (newPage: number) => void
}

export const BookCategoryPagination: FC<IBookCategoryPagination> = (props) => {
    const { books, onChangePage, totalCountBooks, currentPage, className } =
        props
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
        <div className={clsx('book-category-pagination', className)}>
            <div className='book-category-pagination__content'>
                {renderBooks(books)}
            </div>
            <ResponsivePagination
                current={currentPage}
                total={totalPage}
                onPageChange={onChangePage}
                maxWidth={500}
                previousLabel='« Previous'
                nextLabel='Next »'
                className='book-category-pagination__pag'
            />
        </div>
    )
}
