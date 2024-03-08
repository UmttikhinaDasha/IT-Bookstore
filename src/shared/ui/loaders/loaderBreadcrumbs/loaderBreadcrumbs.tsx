import { useMatches } from 'react-router-dom'
import { IMatches } from 'shared/ui/breadcrumbs'

import { Skeleton } from '../skeleton'

import './loaderBreadcrumbs.scss'

export const LoaderBreadcrumbs = () => {
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
        <div className='loader-breadcrumbs'>
            <ul className='loader-breadcrumbs__list'>
                {crumbs.map((_, index) => (
                    <li key={index} className='loader-breadcrumbs__item'>
                        <Skeleton />
                    </li>
                ))}
            </ul>
        </div>
    )
}
