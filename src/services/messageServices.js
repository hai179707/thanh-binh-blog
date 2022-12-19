import * as httpRequest from '~/utils/httpRequest'

export const getMessage = async (page = 1, limit = 20, filter) => {
    try {
        const res = await httpRequest.get('/messages', {
            params: {
                page,
                limit,
                filter
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const postMessage = async (data) => {
    try {
        const res = await httpRequest.post('/messages', data)
        return res
    } catch (error) {
        console.log(error)
    }
}
