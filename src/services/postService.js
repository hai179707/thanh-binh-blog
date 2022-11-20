import * as httpRequest from '~/utils/httpRequest'

export const getSuggestedPost = async (category) => {
    try {
        const res = await httpRequest.get(`/posts/${category}/suggested`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllPost = async (page = 1, limit = 20) => {
    try {
        const res = await httpRequest.get(`/posts`, {
            params: {
                page,
                limit
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllPostOfCategory = async (category, page = 1, limit = 20) => {
    try {
        const res = await httpRequest.get(`/posts/${category}`, {
            params: {
                page,
                limit
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getPostByPath = async (path) => {
    try {
        const res = await httpRequest.get(`/posts/${path}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getPostByPostId = async (postId) => {
    try {
        const res = await httpRequest.get(`/posts/${postId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}