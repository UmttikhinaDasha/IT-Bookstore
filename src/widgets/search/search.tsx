import { ChangeEvent, FC, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { fetchSearch } from 'features/search/model/searchThunk'
import { DropdownSearchItem } from 'features/search/ui/dropdownSearchItem'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'
import { useDebounce } from 'shared/hooks/useDebounce'
import { RootState } from 'shared/model/store'
import { Dropdown } from 'shared/ui/dropdown/dropdown'
import { Input } from 'shared/ui/search/input'

import './search.scss'

interface ISearch {
    /** Additional styles. */
    readonly className?: string
}

const PRIMARY_BG = '#2699fb'

export const Search: FC<ISearch> = (props) => {
    const { className } = props

    const [isOpen, setIsOpen] = useState(false)
    const [valueSearch, setValueSearch] = useState('')

    const books = useAppSelector(
        (state: RootState) => state.search.books?.slice(5)
    )
    const loading = useAppSelector((state: RootState) => state.search.loading)
    const error = useAppSelector((state: RootState) => state.search.error)

    const dispatch = useAppDispatch()

    const getResultsSearchDeboune = useDebounce((searchSrc: string) =>
        dispatch(fetchSearch({ searchSrc, page: 1 }))
    )

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value)

        if (e.target.value.length < 3) {
            getResultsSearchDeboune(e.target.value)
        }
    }

    const renderContent = () => {
        if (loading) {
            return (
                <div className='search__loading'>
                    <FallingLines width='50' color={PRIMARY_BG} />
                </div>
            )
        }
        if (error) {
            return <span className='search__error'>{error.messageError}</span>
        }
        if (valueSearch.length < 3) {
            return (
                <span className='search__info'>
                    Enter search terms, at least 3 characters
                </span>
            )
        }
        return (
            <div>
                {books?.map((item) => (
                    <DropdownSearchItem
                        key={item.isbn13}
                        title={item.title}
                        subtitle={item.subtitle}
                        image={item.image}
                        url={`/books/description/${item.isbn13}`}
                    />
                ))}
                <Link
                    to={`/books/${valueSearch}`}
                    className='search__link-more'>
                    See more
                </Link>
            </div>
        )
    }

    return (
        <div className={clsx('search', className)}>
            <Dropdown
                isOpen={isOpen}
                labelElement={
                    <Input
                        placeholder='Input books by title, author, ISBN or keywords'
                        value={valueSearch}
                        onChange={onChangeSearch}
                        onBlur={() => setIsOpen(false)}
                        onFocus={() => setIsOpen(true)}
                    />
                }
                content={renderContent()}
                className='search__dropdown'
            />
        </div>
    )
}
