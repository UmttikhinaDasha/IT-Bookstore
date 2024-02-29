import { apiInstance } from '../base'

import { IResultsSearch } from './types'

const BASE_URL = 'search'

export const getResultsSearch = (
    searchStr: string,
    page?: number
): Promise<IResultsSearch> => {
    return apiInstance.get(`${BASE_URL}/${searchStr}/${page}`)
}
