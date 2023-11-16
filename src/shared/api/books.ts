import axiosInstance from './interceptors'

export const getPreviewCategory = (category: string) => {
    return axiosInstance.get(`/search/${category}`)
}

export const getCategory = (category: string, page?: number) => {
    return axiosInstance.get(`/search/${category}/${page}`)
}
