import { Link, useRouteError } from 'react-router-dom'
import ErrorImage from 'shared/assets/images/errorImage.svg?react'

import './fallback.scss'

export interface ErrorType {
    /** Error message.  */
    readonly messageError?: string
    /** Error status. */
    readonly status?: string
}

export const Fallback = () => {
    const error = useRouteError()
    const knownError = error as ErrorType

    return (
        <div role='alert' className='fallback'>
            <ErrorImage className='fallback__img' />
            <h1 className='fallback__img'>Something went wrong</h1>
            <span className='fallback__describe'>
                {knownError?.messageError} {knownError?.status}
            </span>
            <Link to='/' className='fallback__link'>
                Go to home page
            </Link>
        </div>
    )
}
