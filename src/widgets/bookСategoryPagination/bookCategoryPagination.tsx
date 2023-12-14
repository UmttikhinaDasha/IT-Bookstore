import { useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import ResponsivePagination from 'react-responsive-pagination'
import { BookPreview } from 'entities/book/ui/bookPreview/bookPreview'
import {
    fetchCategory,
    ResponseType,
} from 'entities/category/model/categoryThunk'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { IBookPreview } from 'shared/types/bookType'
import { Breadcrumbs } from 'shared/ui/breadcrumbs/breadcrumbs'
import { ErrorType } from 'shared/ui/fallback/fallback'
import { LoaderCategory } from 'shared/ui/loaders/loaderCategory/loaderCategory'

import './bookCategoryPagination.scss'
import 'react-responsive-pagination/themes/classic.css'

export const BookCategoryPagination = ({ id }: { id: string }) => {
    const totalCountBooks = Number(
        useAppSelector((state: RootState) => state.category.totalCountBooks)
    )
    const currentPage = Number(
        useAppSelector((state: RootState) => state.category.currentPage)
    )
    const books = useAppSelector((state: RootState) => state.category.books)
    const loading = useAppSelector((state: RootState) => state.category.loading)
    const error = useAppSelector((state: RootState) => state.category.error)

    const dispatch = useAppDispatch()

    const { showBoundary } = useErrorBoundary<ErrorType>()

    const totalPage = Math.ceil(totalCountBooks / 10)

    useEffect(() => {
        dispatch(fetchCategory({ category: id, page: 1 })).then((res) => {
            if (res.payload?.data.books.length === 0)
                showBoundary({ messageError: 'This category was not found' })
        })
    }, [id])

    const onPageChange = (newPage: number) => {
        dispatch(fetchCategory({ category: id, page: newPage }))
    }

    const renderBooks = (items: IBookPreview[]) => {
        return items.map((item) => (
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

    if (error) showBoundary(error)

    return (
        <>
            {loading && <LoaderCategory numBookLoaders={20} />}
            {!loading && (
                <div className='book-category-pagination'>
                    <Breadcrumbs />
                    <div className='book-category-pagination__content'>
                        {renderBooks(books)}
                    </div>
                    <ResponsivePagination
                        current={currentPage}
                        total={totalPage}
                        onPageChange={onPageChange}
                        maxWidth={500}
                    />
                </div>
            )}
        </>
    )
}
