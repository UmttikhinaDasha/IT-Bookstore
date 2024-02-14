import { FallingLines } from 'react-loader-spinner'

import './loaderCategoryPreview.scss'

const PRIMARY_BG = '#2699fb'

export const LoaderCategoryPreview = () => {
    return (
        <div className='loader-category-preview'>
            <FallingLines width='100' color={PRIMARY_BG} />
        </div>
    )
}
