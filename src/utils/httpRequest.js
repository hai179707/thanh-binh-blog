import axios from 'axios'

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options)
    return response.data
}

export const put = async (path, data = {}) => {
    const response = await httpRequest.put(path, data)
    return response.data
}

export default httpRequest