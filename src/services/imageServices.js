import * as httpRequest from '~/utils/httpRequest'

export const getImage = async (page = 1, limit = 20, filter) => {
    try {
        const res = await httpRequest.get('/images', {
            params: {
                filter,
                page,
                limit
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const postImage = async (data) => {
    try {
        const res = await httpRequest.post('/upload', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteImage = async (id) => {
    try {
        const res = await httpRequest.deleteRequest('/images/' + id)
        return res
    } catch (error) {
        console.log(error)
    }
}