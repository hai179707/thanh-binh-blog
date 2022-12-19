import * as httpRequest from '~/utils/httpRequest'

export const getCategory = async () => {
    try {
        const res = await httpRequest.get('/categories')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getACategory = async (categoryId) => {
    try {
        const res = await httpRequest.get('/categories/' + categoryId)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateCategory = async (id, data) => {
    try {
        const res = await httpRequest.put('/categories/' + id, data)
        return res
    } catch (error) {
        console.log(error)
    }
}