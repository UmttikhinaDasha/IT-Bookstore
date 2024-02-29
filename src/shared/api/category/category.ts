import { apiInstance } from '../base'

import { IPreviewCategory } from './types'

const BASE_URL = 'search'

export const getPreviewCategory = (
    category: string
): Promise<IPreviewCategory> => {
    return apiInstance.get(`${BASE_URL}/${category}`)
}
