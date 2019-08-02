import React from 'react'
import PropTypes from 'prop-types'
import { getJwt, redirectIfAuthenticated, redirectIfNotAuthenticated } from './lib/auth'
import { profile } from './services/auth'

const UserContext = React.createContext()

export const Auth = options =>
    Component => {
        class AuthHOC extends React.Component {
            static async getInitialProps(ctx) {
                const { ACL, action } = options
                const token = getJwt(ctx.req)
                const user = await profile(token)
                switch (action) {
                    case 'RINA':
                        await redirectIfNotAuthenticated(ctx, { user, ACL, pathname: ctx.pathname })
                        break
                    case 'RIA':
                        await redirectIfAuthenticated(ctx, user)
                        break
                    default:
                        break
                }
                const props = (
                    Component.getInitialProps
                        ? await Component.getInitialProps(ctx)
                        : null
                ) || {}
                return { ...props, token, user }
            }

            render() {
                const { user, token, ...rest } = this.props
                return (
                    <UserContext.Provider value={{ ...user, token }}>
                        <Component {...rest} user={{ ...user, token }} />
                    </UserContext.Provider>
                )
            }
        }

        AuthHOC.propTypes = {
            user: PropTypes.object,
            token: PropTypes.string
        }

        return AuthHOC
    }

export const withUser = Component =>
    props => (
        <UserContext.Consumer>
            {user =>
                <Component
                    {...props}
                    user={(user && Object.keys(user).length > 1) ? user : null}
                />}
        </UserContext.Consumer>
    )
