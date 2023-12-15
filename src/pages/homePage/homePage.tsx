import { useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { BookPreview } from 'entities/book/ui/bookPreview/bookPreview'
import { fetchCategoryPreview } from 'entities/category/model/categoryPreview/categoryPreviewThunk'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { IBookPreview } from 'shared/types/bookType'
import { Carousel } from 'shared/ui/carousel/carousel'
import { LoaderCategoryPreview } from 'shared/ui/loaders/loaderCategoryPreview/loaderCategoryPreview'
import { ProductСategory } from 'widgets/productСategory/productСategory'

import './homePage.scss'

export const HomePage = () => {
    // TODO: Добавить получение категорий не через названия, а через массив с ссылками.
    const TITLE_OF_BOOK_CATEGOTIES = ['Android', 'Python', 'JavaScript']

    const books = useAppSelector(
        (state: RootState) => state.categoryPreview.books
    )
    const loading = useAppSelector(
        (state: RootState) => state.categoryPreview.loading
    )
    const error = useAppSelector(
        (state: RootState) => state.categoryPreview.error
    )
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
                title={titleCategory}
                className='home-page__category'>
                <LoaderCategoryPreview />
            </ProductСategory>
        ))
    }

    if (error) showBoundary(error)

    return loading ? renderLoaderCategories() : renderCategories(books)
}
