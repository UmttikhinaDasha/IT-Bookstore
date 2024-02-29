import { FC } from 'react'
import ArrowRight from 'shared/assets/icons/arrowRight.svg?react'
import DefaulImageAuthor from 'shared/assets/images/defaultAuthor.png'
import { Button } from 'shared/ui/button'

import './authors.scss'

interface IAuthors {
    authors: string
}

export const Authors: FC<IAuthors> = (props) => {
    const { authors } = props

    return (
        <div className='authors'>
            <h2 className='authors__title'>Authors</h2>
            <div className='authors__wrapper-names'>
                <img src={DefaulImageAuthor} alt="Author's default." />
                <h3 className='authors__names'>{authors}</h3>
            </div>
            <div className='authors__wrapper-button'>
                <Button theme='transparent-grey' className='authors__button'>
                    Read more
                </Button>
                <ArrowRight />
            </div>
        </div>
    )
}
