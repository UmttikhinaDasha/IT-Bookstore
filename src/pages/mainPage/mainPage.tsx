import { useEffect } from 'react'
import { fetchBookPreview } from 'entities/book/model/bookPreviewThunk'
import { BookPreview } from 'entities/book/ui/bookPreview/bookPreview'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { IBookPreview } from 'shared/types/bookType'
import { Carousel } from 'shared/ui/carousel/carousel'
import { ProductСategory } from 'widgets/productСategory/productСategory'

import './mainPage.scss'

export const MainPage = () => {
    const TITLE_OF_BOOK_CATEGOTIES = ['Android', 'Python', 'JavaScript']

    const books = useAppSelector((state: RootState) => state.bookPreview.books)
    const loading = useAppSelector(
        (state: RootState) => state.bookPreview.loading
    )
    const error = useAppSelector((state: RootState) => state.bookPreview.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
        TITLE_OF_BOOK_CATEGOTIES.forEach((title) =>
            dispatch(fetchBookPreview(title))
        )
    }, [])

    const renderBooks = (items: IBookPreview[]) => {
        return items.map((item) => (
            <BookPreview
                key={item.isbn13}
                isbn13={item.isbn13}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
                className='main-page__item'
            />
        ))
    }

    const renderCategories = (categories: {
        [key: string]: IBookPreview[]
    }) => {
        return Object.keys(categories).map((titleCategory) => (
            <ProductСategory
                title={titleCategory}
                className='main-page__category'>
                <Carousel items={renderBooks(categories[titleCategory])} />
            </ProductСategory>
        ))
    }

    return <>{renderCategories(books)}</>
}
