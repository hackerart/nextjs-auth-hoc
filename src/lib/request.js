import axios from 'axios'

export const getUrl = endpoint => process.env.API_HOST + endpoint

const buildHeader = jwt => ({
    'Content-Type': 'application/json',
    ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
})

export const get = async (endpoint, jwt, params = {}) => {
    const headers = buildHeader(jwt)

    return axios.get(endpoint.startsWith('https') ? endpoint : getUrl(endpoint), {
        headers,
        params
    })
}
