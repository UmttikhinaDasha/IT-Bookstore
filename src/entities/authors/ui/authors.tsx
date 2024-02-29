import { FC } from 'react'
import { Link } from 'react-router-dom'
import ArrowRight from 'shared/assets/icons/arrowRight.svg?react'
import DefaulImageAuthor from 'shared/assets/images/defaultAuthor.png'
import { Carousel } from 'shared/ui/carousel'

import './authors.scss'

interface IAuthors {
    authors: string[]
}

const AuthorContent = (props: { author: string }) => {
    const { author } = props

    return (
        <div className='authors'>
            <h2 className='authors__title'>Authors</h2>
            <div className='authors__wrapper-names'>
                <img src={DefaulImageAuthor} alt="Author's default." />
                <h3 className='authors__names'>{author}</h3>
            </div>
            <div className='authors__wrapper-link'>
                <Link to={`/search/${author}`} className='authors__link'>
                    Read more
                </Link>
                <ArrowRight />
            </div>
        </div>
    )
}

export const Authors: FC<IAuthors> = (props) => {
    const { authors } = props

    const authorsContent = authors.map((item) => (
        <AuthorContent author={item} />
    ))

    return authors.length > 1 ? (
        <Carousel className='authors__carousel'>{authorsContent}</Carousel>
    ) : (
        <AuthorContent author={authors[0]} />
    )
}
