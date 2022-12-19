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

export const getAllPostOfCategory = async (categoryId, page = 1, limit = 20) => {
    try {
        const res = await httpRequest.get('/categories/' + categoryId + '/posts', {
            params: {
                page,
                limit
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}


export const getSuggestedPostOfCategory = async (categoryId) => {
    try {
        const res = await httpRequest.get('/categories/' + categoryId + '/posts/suggested')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getPost = async id => {
    try {
        const res = await httpRequest.get('/posts/' + id)
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

export const createPost = async (data) => {
    try {
        const res = await httpRequest.post('/posts', data)
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
