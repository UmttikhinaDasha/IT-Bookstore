import { useEffect } from 'react'
import { Responsive } from 'react-alice-carousel'
import { useErrorBoundary } from 'react-error-boundary'
import { BookPreview } from 'entities/book/bookPreview'
import {
    fetchCategoryPreview,
    selectCategoryPreviewBooks,
    selectCategoryPreviewError,
    selectCategoryPreviewLoading,
} from 'entities/categoryPreview'
import { AddToCart } from 'features/cart'
import { IBookPreview } from 'shared/api'
import { SLIDES } from 'shared/consts'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { Carousel } from 'shared/ui/carousel'
import { LoaderCarousel } from 'shared/ui/loaders/loaderСarousel'
import { ProductСategory } from 'widgets/productСategory'
import { Slider } from 'widgets/slider'

import './homePage.scss'

const responsive: Responsive = {
    1024: { items: 5 },
}

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
                        className='home-page__button-add'
                    />
                }
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
                    autoWidth
                    disableDotsControls
                    responsive={responsive}
                    countVisibleElements={5}>
                    {renderBooks(categories[titleCategory], titleCategory)}
                </Carousel>
            </ProductСategory>
        ))
    }

    const loaderCategories = TITLE_OF_BOOK_CATEGOTIES?.map((titleCategory) => (
        <ProductСategory
            key={titleCategory}
            title={titleCategory}
            className='home-page__category'>
            <LoaderCarousel />
        </ProductСategory>
    ))

    if (error) showBoundary(error)
    if (loading)
        return (
            <>
                <LoaderCarousel />
                {loaderCategories}
            </>
        )

    return (
        <>
            <Slider slides={SLIDES} />
            {renderCategories(books)}
        </>
    )
}
