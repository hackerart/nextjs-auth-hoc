import { get } from '../lib/request'
import { to } from '../lib/helpers'

export const profile = async token => {
    const [err, data] = await to(
        get(process.env.GET_SESSION_URL || '/user/session', token)
    )
    return (err || !data.success) ? null : data.data
}
