import { useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { fetchBookPreview } from 'entities/book/model/bookPreviewThunk'
import { BookPreview } from 'entities/book/ui/bookPreview/bookPreview'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { IBookPreview } from 'shared/types/bookType'
import { Carousel } from 'shared/ui/carousel/carousel'
import { LoaderCategoryPreview } from 'shared/ui/loaders/loaderCategoryPreview/loaderCategoryPreview'
import { ProductСategory } from 'widgets/productСategory/productСategory'

import './mainPage.scss'

export const MainPage = () => {
    // TODO: Добавить получение категорий не через названия, а через массив с ссылками.
    const TITLE_OF_BOOK_CATEGOTIES = ['Android', 'Python', 'JavaScript']

    const books = useAppSelector((state: RootState) => state.bookPreview.books)
    const loading = useAppSelector(
        (state: RootState) => state.bookPreview.loading
    )
    const error = useAppSelector((state: RootState) => state.bookPreview.error)
    const dispatch = useAppDispatch()

    const { showBoundary } = useErrorBoundary()

    useEffect(() => {
        TITLE_OF_BOOK_CATEGOTIES.forEach((title) =>
            dispatch(fetchBookPreview(title))
        )
    }, [])

    const renderBooks = (items: IBookPreview[], categoryId: string) => {
        return items?.map((item) => (
            <BookPreview
                key={item.isbn13}
                isbn13={item.isbn13}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
                categoryId={categoryId}
                className='main-page__item'
            />
        ))
    }

    const renderCategories = (categories: {
        [key: string]: IBookPreview[]
    }) => {
        return Object.keys(categories)?.map((titleCategory) => (
            <ProductСategory
                title={titleCategory}
                className='main-page__category'>
                <Carousel
                    items={renderBooks(
                        categories[titleCategory],
                        titleCategory
                    )}
                />
            </ProductСategory>
        ))
    }

    const renderLoaderCategories = () => {
        return TITLE_OF_BOOK_CATEGOTIES?.map((titleCategory) => (
            <ProductСategory
                title={titleCategory}
                className='main-page__category'>
                <LoaderCategoryPreview />
            </ProductСategory>
        ))
    }

    if (error) showBoundary(error)

    return loading ? renderLoaderCategories() : renderCategories(books)
}
