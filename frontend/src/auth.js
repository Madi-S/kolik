export class Auth {
    TOKEN = '2222'
    USER_ID = ''

    static setToken = value => {
        Auth.TOKEN = value
    }

    static setUserId = value => {
        Auth.USER_ID = value
    }

    static getUserId = () => {
        return Auth.USER_ID
    }

    static getToken = () => {
        return Auth.TOKEN
    }
}

export const setUserId = userId => {
    Auth.setUserId(userId)
}

export const getUserId = () => {
    return Auth.getUserId()
}

export const setToken = token => {
    Auth.setToken(token)
}

export const getToken = () => {
    return Auth.getToken()
}
