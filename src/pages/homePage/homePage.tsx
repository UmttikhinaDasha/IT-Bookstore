import { useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { BookPreview } from 'entities/book/bookPreview/ui'
import {
    fetchCategoryPreview,
    selectCategoryPreviewBooks,
    selectCategoryPreviewError,
    selectCategoryPreviewLoading,
} from 'entities/category/categoryPreview/model'
import { IBookPreview } from 'shared/api'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { Carousel } from 'shared/ui/carousel'
import { LoaderCategoryPreview } from 'shared/ui/loaders/loaderCategoryPreview'
import { ProductСategory } from 'widgets/productСategory'

import './homePage.scss'

export const HomePage = () => {
    // TODO: Добавить получение категорий не через названия, а через массив с ссылками.
    const TITLE_OF_BOOK_CATEGOTIES = ['Android', 'Python', 'JavaScript']

    const books = useAppSelector(selectCategoryPreviewBooks)
    const loading = useAppSelector(selectCategoryPreviewLoading)
    const error = useAppSelector(selectCategoryPreviewError)
    const dispatch = useAppDispatch()

    const { showBoundary } = useErrorBoundary()

    useEffect(() => {
        TITLE_OF_BOOK_CATEGOTIES.forEach((title) =>
            dispatch(fetchCategoryPreview(title))
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
                className='home-page__item'
            />
        ))
    }

    const renderCategories = (categories: {
        [key: string]: IBookPreview[]
    }) => {
        return Object.keys(categories)?.map((titleCategory) => (
            <ProductСategory
                key={titleCategory}
                title={titleCategory}
                className='home-page__category'>
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
                key={titleCategory}
                title={titleCategory}
                className='home-page__category'>
                <LoaderCategoryPreview />
            </ProductСategory>
        ))
    }

    if (error) showBoundary(error)

    return loading ? renderLoaderCategories() : renderCategories(books)
}
