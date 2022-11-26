import * as httpRequest from '~/utils/httpRequest'

export const getAbout = async () => {
    try {
        const res = await httpRequest.get('/about')
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const putAbout = async (data) => {
    try {
        const res = await httpRequest.put('/about', data)
        return res
    } catch (error) {
        console.log(error)
    }
}