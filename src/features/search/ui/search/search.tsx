import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import {
    DropdownSearchItem,
    fetchSearch,
    selectSearchBooks,
    selectSearchError,
    selectSearchLoading,
} from 'features/search'
import { useAppDispatch, useAppSelector, useDebounce } from 'shared/lib'
import { Dropdown } from 'shared/ui/dropdown'
import { Input } from 'shared/ui/input'

import './search.scss'

interface ISearch {
    /** Additional styles. */
    readonly className?: string
}

const PRIMARY_BG = '#2699fb'

export const Search: FC<ISearch> = (props) => {
    const { className } = props

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const [valueSearch, setValueSearch] = useState('')

    const books = useAppSelector(selectSearchBooks)
    const loading = useAppSelector(selectSearchLoading)
    const error = useAppSelector(selectSearchError)
    const dispatch = useAppDispatch()

    const { debouncedFunction: getResultsSearchDeboune, loadingDebounce } =
        useDebounce((searchSrc: string) =>
            dispatch(fetchSearch({ searchSrc, page: 1 }))
        )

    const goToResultsPage = () => {
        navigate(`/search/${valueSearch}`)
        setValueSearch('')
    }

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value)

        if (e.target.value.length >= 3) {
            getResultsSearchDeboune(e.target.value)
        }
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            goToResultsPage()
            e.currentTarget.blur()
        }
    }

    const renderContent = () => {
        if (loading || loadingDebounce) {
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
                <button
                    type='button'
                    onClick={goToResultsPage}
                    className='search__button-more'>
                    See more
                </button>
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
                        onKeyDown={onKeyDown}
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
