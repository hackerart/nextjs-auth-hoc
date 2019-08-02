export const to = promise => promise
    .then(res => [null, { ...res.data, statusCode: res.status }, res])
    .catch(err => {
        try {
            return [
                { ...err.response.data, statusCode: err.response.status } || 'Unknown error'
            ]
        } catch (e) { return ['Unknown error'] }
    })
