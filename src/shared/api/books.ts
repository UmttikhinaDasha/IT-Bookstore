import axiosInstance from './interceptors'

export const getBookCategory = (category: string, page?: number) => {
    return axiosInstance.get(`/search/${category}`)
}
