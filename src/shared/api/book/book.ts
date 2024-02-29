import { apiInstance } from '../base'

import { IBookDescription } from './types'

const BASE_URL = 'books'

export const getBook = (isbn13: string): Promise<IBookDescription> => {
    return apiInstance.get(`${BASE_URL}/${isbn13}`)
}
