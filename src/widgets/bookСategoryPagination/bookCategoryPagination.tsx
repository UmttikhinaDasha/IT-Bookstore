import { useEffect } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import { BookPreview } from 'entities/book/ui/bookPreview/bookPreview'
import { fetchCategory } from 'entities/category/model/categoryThunk'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'
import { RootState } from 'shared/model/store'
import { IBookPreview } from 'shared/types/bookType'
import { Breadcrumbs } from 'shared/ui/breadcrumbs/breadcrumbs'

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
    const dispatch = useAppDispatch()

    const totalPage = Math.ceil(totalCountBooks / 10)

    useEffect(() => {
        dispatch(fetchCategory({ category: id, page: 1 }))
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

    return (
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
    )
}
