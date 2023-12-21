import { useState } from 'react'
import { InView } from 'react-intersection-observer'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { CONTENT_NAVIGATION_MENU } from 'shared/consts/contentNavMenu'
import { NavigationMenu } from 'shared/ui/navigationMenu/navigationMenu'
import { Header } from 'widgets/header/header'

export const Layout = () => {
    const [isViewHeader, setIsViewHeader] = useState(true)

    const onChangeViewHeader = (inView: boolean): void => {
        setIsViewHeader(inView)
    }

    return (
        <>
            <InView as='div' onChange={(inView) => onChangeViewHeader(inView)}>
                <Header />
            </InView>
            <NavigationMenu
                content={CONTENT_NAVIGATION_MENU}
                isSticky={!isViewHeader}
            />

            <main>
                <Outlet />
            </main>
            <ScrollRestoration />
        </>
    )
}
