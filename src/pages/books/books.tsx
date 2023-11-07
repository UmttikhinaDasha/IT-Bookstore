import { BookPreview } from '../../components/bookPreview/bookPreview'
import { BOOKS } from '../../consts/books'
import { IBookPreview } from '../../types/bookType'

import './books.scss'

export const Books = () => {
    const renderBooks = (books: IBookPreview[]) =>
        books.map((book) => (
            <BookPreview
                key={book.isbn13}
                isbn13={book.isbn13}
                image={book.image}
                title={book.title}
                subtitle={book.subtitle}
                price={book.price}
            />
        ))

    return (
        <div className='books _container'>
            <main className='books__content'>{renderBooks(BOOKS)}</main>
        </div>
    )
}
