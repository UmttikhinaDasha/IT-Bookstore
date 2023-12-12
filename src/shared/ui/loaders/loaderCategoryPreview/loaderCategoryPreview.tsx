import { FallingLines } from 'react-loader-spinner'

import './loaderCategoryPreview.scss'

export const LoaderCategoryPreview = () => {
    const PRIMARY_BG = '#2699fb'

    return (
        <div className='loader-category-preview'>
            <FallingLines width='100' color={PRIMARY_BG} />
        </div>
    )
}
