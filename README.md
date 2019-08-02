A Higher Order Component for restricting page access.

## Installation

    // with npm
    npm install @material-ui/core
    
    // with yarn
    yarn add @material-ui/core

## Configuration
Before using you have to specify some variables in .env of your project
    
    # Default page to redirect users if user is not authenticated
    REDIRECT_IF_NOT_AUTHENTICATED=/auth/signin
    # Default page to redirect if user is authenticated
    REDIRECT_IF_AUTHENTICATED=/dashboard
    # Default page to redirect if action is not authorized
    REDIRECT_IF_NO_ACCESS=/dashboard
    # Name of cookie key for JWT token storage
    JWT_COOKIE_NAME=jwt
    # Host of site, only need if your authentication happens on other domain
    # It needed to pass "ref" query
    REFERER=http://example.com
    # Base URL of root endpoint
    API_HOST=http://api.example.com/v1
    # URL to get user session
    # if not specified default will be "/auth/session"
    GET_SESSION_URL=/user/profile

## Usage
Here is a quick example to get you started, **it's all you need**:

    import React from 'react';
    import { Auth } from 'nextjs-auth-hoc';
    
    class Posts extends React.Component {
	    static async getInitialProps() {
            return {};
	    }
	    
        render() {
            const { user: { token } } = this.props // You also can access user object
            return (
                <div>List of posts</div>
            );
	    }
    }
    export default Auth({ action: 'RINA' })(Posts)
    
There is also a special HOC withUser to access user object, **it's all you need**:

    import React from 'react';
    import { withUser } from 'nextjs-auth-hoc';
    
    const Header = (props) => {	    
        return (
            <div>{props.user.name}</div>
        )
    }
    export default withUser(Header)
    
You can restrict accessing page by passing ACL option, **it's all you need**:
    
    import React from 'react';
    import { Auth } from 'nextjs-auth-hoc';
    
    class Dashboard extends React.Component {
        static async getInitialProps() {
            return {};
        }
        
        render() {
            const { user: { token } } = this.props // You also can access user object
            return (
                <div>List of posts</div>
            );
        }
    }
    export default Auth({ action: 'RINA', ACL: ['admin'] })(Dashboard)
## API
Params

action - type: 'String' ----- **optional**

|          |  description  |
|----------|---------------|
|   RINA   | "RINA" - Redirect if not authenticated
|   RIA    | "RIA" - redirect if authenticated

ACL - type: 'Array' ------ **optional**

