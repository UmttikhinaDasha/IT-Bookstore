import { BookPreview } from 'entities/book/ui/bookPreview/bookPreview'
import { BOOKS } from 'shared/consts/books'
import { IBookPreview } from 'shared/types/bookType'
import { Carousel } from 'shared/ui/carousel/carousel'
import { ProductСategory } from 'widgets/productСategory/productСategory'

import './mainPage.scss'

export const MainPage = () => {
    const renderBooks = (books: IBookPreview[]) => {
        return books.map((book) => (
            <BookPreview
                key={book.isbn13}
                isbn13={book.isbn13}
                image={book.image}
                title={book.title}
                subtitle={book.subtitle}
                price={book.price}
                className='main-page__item'
            />
        ))
    }

    return (
        <>
            <ProductСategory title='All books' className='main-page__category'>
                <Carousel items={renderBooks(BOOKS)} />
            </ProductСategory>

            <ProductСategory title='New' className='main-page__category'>
                <Carousel items={renderBooks(BOOKS)} />
            </ProductСategory>
        </>
    )
}
