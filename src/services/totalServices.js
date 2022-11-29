import * as httpRequest from '~/utils/httpRequest'

export const getTotal = async () => {
    try {
        const res = await httpRequest.get('/total')
        return res
    } catch (error) {
        console.log(error)
    }
}
