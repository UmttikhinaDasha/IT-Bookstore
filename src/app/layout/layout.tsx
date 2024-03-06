import { useState } from 'react'
import { InView } from 'react-intersection-observer'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { CONTENT_NAVIGATION_MENU } from 'shared/consts'
import { NavigationMenu } from 'shared/ui/navigationMenu'
import { Footer } from 'widgets/footer'
import { Header } from 'widgets/header'

import 'react-toastify/dist/ReactToastify.css'

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
            <Footer />

            <ScrollRestoration />
            <ToastContainer
                position='bottom-right'
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
            />
        </>
    )
}
