import { FC } from 'react'
import { Params, useMatches } from 'react-router-dom'
import clsx from 'clsx'
import Home from 'shared/assets/icons/home.svg?react'

import './breadcrumbs.scss'

export interface IMatches {
    /** Route id. */
    id: string
    /** The portion of the URL the route matched. */
    pathname: string
    /**  The parsed params from the URL. */
    params: Params<string>
    /** The data from the loader. */
    data: unknown
    /** The <Route handle> with any app specific data. */
    handle: {
        crumb: (param?: IMatches) => React.ReactNode
    }
}

interface IBreadcrumbs {
    /** Additional styles. */
    className?: string
}

export const Breadcrumbs: FC<IBreadcrumbs> = (props) => {
    const { className } = props

    // @ts-ignore
    const matches: IMatches[] = useMatches()

    const crumbs = matches
        .filter((match) => Boolean(match.handle?.crumb))
        .map((match) =>
            typeof match.handle.crumb === 'function'
                ? match.handle.crumb(match)
                : match.handle.crumb
        )

    return (
        <div className={clsx('breadcrumbs', className)}>
            <Home className='breadcrumbs__img' />
            <ul className='breadcrumbs__list'>
                {crumbs.map((crumb, index) => (
                    <li key={index} className='breadcrumbs__item'>
                        {crumb}
                    </li>
                ))}
            </ul>
        </div>
    )
}
