import { FC } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import { Theme, useTheme } from 'entities/theme'

const baseColorLight = '#ebebeb'
const highlightColorLight = '#f5f5f5'

const baseColorDark = '#202020'
const highlightColorDark = '#44444480'

export const SkeletonBase: FC<SkeletonProps> = (props) => {
    const { theme } = useTheme()

    const baseColor = theme === Theme.LIGHT ? baseColorLight : baseColorDark
    const highlightColor =
        theme === Theme.LIGHT ? highlightColorLight : highlightColorDark

    return (
        <Skeleton
            baseColor={baseColor}
            highlightColor={highlightColor}
            {...props}
        />
    )
}
