import axios from 'axios'

export const API_URL = 'https://api.itbook.store/1.0/'

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 120000,
})

export default axiosInstance
