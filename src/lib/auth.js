import intersection from 'lodash/intersection'
import redirect from './redirect'
import { getCookie } from './session'

export const getJwt = req => getCookie(process.env.JWT_COOKIE_NAME, req)

const check_acl = (ACL, roles) => (
    !ACL
        ? true
        : intersection(ACL, roles).length > 0
)

export const redirectIfAuthenticated = async (ctx, user) => (
    user && redirect(process.env.REDIRECT_IF_AUTHENTICATED, ctx)
)

export const redirectIfNotAuthenticated = async (ctx, { user, ACL, pathname }) => {
    // if not logged in
    if (!user) {
        const url = process.env.REDIRECT_IF_NOT_AUTHENTICATED + (
            process.env.REDIRECT_IF_NOT_AUTHENTICATED && process.env.REDIRECT_IF_NOT_AUTHENTICATED.startsWith('http')
                ? `?ref=${process.env.REFERER}${pathname || ''}`
                : ''
        )
        return redirect(url)
    }

    // if do not have access
    if (user && !check_acl(ACL, user.roles))
        return redirect(process.env.REDIRECT_IF_NO_ACCESS, ctx)
}
