import * as httpRequest from '~/utils/httpRequest'

export const getTags = async () => {
    try {
        const res = await httpRequest.get('/tags')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const createTag = async (data) => {
    try {
        const res = await httpRequest.post('/tags', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateTag = async (id, data) => {
    try {
        const res = await httpRequest.put('/tags/' + id, data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteTag = async (id) => {
    try {
        const res = await httpRequest.deleteRequest('/tags/' + id)
        return res
    } catch (error) {
        console.log(error)
    }
}