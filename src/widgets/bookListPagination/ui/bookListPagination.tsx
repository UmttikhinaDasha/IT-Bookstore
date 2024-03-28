import { FC } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import clsx from 'clsx'
import { BookPreview } from 'entities/book/bookPreview'
import { AddToCart } from 'features/cart'
import { IBookPreview } from 'shared/api'
import {
    MAXIMUM_NUMBER_OF_PAGES,
    NUMBER_ELEMENTS_ON_PAGINATION_PAGE,
} from 'shared/consts'

import './bookListPagination.scss'

interface IBookListPagination {
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

export const BookListPagination: FC<IBookListPagination> = (props) => {
    const { books, onChangePage, totalCountBooks, currentPage, className } =
        props

    /** There is a page limit because there is an error in the api. */
    const totalPage =
        Math.ceil(totalCountBooks / NUMBER_ELEMENTS_ON_PAGINATION_PAGE) >
        MAXIMUM_NUMBER_OF_PAGES
            ? MAXIMUM_NUMBER_OF_PAGES
            : Math.ceil(totalCountBooks / NUMBER_ELEMENTS_ON_PAGINATION_PAGE)

    const renderBooks = (items: IBookPreview[] | null) => {
        return items?.map((item) => (
            <BookPreview
                key={item.isbn13}
                isbn13={item.isbn13}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
                actionSlot={
                    <AddToCart
                        bookInfo={{
                            isbn13: item.isbn13,
                            image: item.image,
                            title: item.title,
                            quantity: 1,
                            price: item.price,
                            url: `/books/description/${item.isbn13}`,
                        }}
                        className='book-list-pagination__button-add'
                    />
                }
            />
        ))
    }

    return (
        <div className={clsx('book-list-pagination', className)}>
            <div className='book-list-pagination__content'>
                {renderBooks(books)}
            </div>
            <ResponsivePagination
                current={currentPage}
                total={totalPage}
                onPageChange={onChangePage}
                maxWidth={500}
                previousLabel='« Previous'
                nextLabel='Next »'
                className='book-list-pagination__pag'
            />
        </div>
    )
}
