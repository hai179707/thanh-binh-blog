import * as httpRequest from '~/utils/httpRequest'

export const getContact = async () => {
    try {
        const res = await httpRequest.get('/contacts')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const putContact = async (data) => {
    try {
        const res = await httpRequest.put('/contacts', data)
        return res
    } catch (error) {
        console.log(error)
    }
}