import { useState } from 'react'
import { InView } from 'react-intersection-observer'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Theme, useTheme } from 'entities/theme'
import { ToggleTheme } from 'features/theme'
import { CONTENT_NAVIGATION_MENU } from 'shared/consts'
import { Footer } from 'widgets/footer'
import { Header } from 'widgets/header'
import { NavigationMenu } from 'widgets/navigationMenu'

import 'react-toastify/dist/ReactToastify.css'
import './layout.scss'

const baseColorLight = '#ebebeb'
const highlightColorLight = '#f5f5f5'

const baseColorDark = '#202020'
const highlightColorDark = '#44444480'

export const Layout = () => {
    const [isViewHeader, setIsViewHeader] = useState(true)
    const { theme } = useTheme()

    const baseColor = theme === Theme.LIGHT ? baseColorLight : baseColorDark
    const highlightColor =
        theme === Theme.LIGHT ? highlightColorLight : highlightColorDark

    const onChangeViewHeader = (inView: boolean): void => {
        setIsViewHeader(inView)
    }

    return (
        <div className='layout layout__wrapper'>
            <SkeletonTheme
                baseColor={baseColor}
                highlightColor={highlightColor}>
                <InView
                    as='div'
                    onChange={(inView) => onChangeViewHeader(inView)}>
                    <Header />
                </InView>
                <NavigationMenu
                    content={CONTENT_NAVIGATION_MENU}
                    isSticky={!isViewHeader}
                />

                <main className='layout__content'>
                    <Outlet />
                </main>
                <Footer className='layout__footer' />

                <ToggleTheme />
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
            </SkeletonTheme>
        </div>
    )
}
