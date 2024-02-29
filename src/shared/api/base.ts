import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export const API_URL = 'https://api.itbook.store/1.0/'

class ApiInstance {
    private axios: AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            timeout: 120000,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    async get<T>(
        endpoint: string,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.axios.get(
            endpoint,
            options
        )
        return response.data
    }
}

export const apiInstance = new ApiInstance()
