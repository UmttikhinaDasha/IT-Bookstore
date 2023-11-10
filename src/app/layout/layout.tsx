import { Outlet } from 'react-router-dom'
import { CONTENT_NAVIGATION_MENU } from 'shared/consts/contentNavMenu'
import { NavigationMenu } from 'shared/ui/navigationMenu/navigationMenu'
import { Header } from 'widgets/header/header'

export const Layout = () => {
    return (
        <>
            <header>
                <Header />
                <NavigationMenu content={CONTENT_NAVIGATION_MENU} />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}
