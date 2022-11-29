import * as httpRequest from '~/utils/httpRequest'

export const getAllPost = async (page = 1, limit = 20, filter) => {
    try {
        const res = await httpRequest.get('/posts', {
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

export const updatePost = async (id, data) => {
    try {
        const res = await httpRequest.put('/posts/' + id, data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (id) => {
    try {
        const res = await httpRequest.deleteRequest('/posts/' + id)
        return res
    } catch (error) {
        console.log(error)
    }
}
