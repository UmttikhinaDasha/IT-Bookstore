import axiosInstance from './interceptors'

export const getPreviewCategory = (category: string) => {
    return axiosInstance.get(`/search/${category}`)
}

export const getCategory = (category: string, page?: number) => {
    return axiosInstance.get(`/search/${category}/${page}`)
}

export const getBook = (isbn13: string) => {
    return axiosInstance.get(`/books/${isbn13}`)
}
