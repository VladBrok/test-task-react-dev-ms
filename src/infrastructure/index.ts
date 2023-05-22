import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

// TODO: intercept all requests and add delay 0.5 s

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

class InfrastructureClient {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await axiosInstance.get<T>(url, config)
    return response
  }
}

export const Client = new InfrastructureClient()
