const TOKEN_NAME = 'lksajd;flkjadsf;lkadsf'

export function getToken() {
    return localStorage.getItem(TOKEN_NAME) || null
}

export function setToken(token) {
    localStorage.setItem(TOKEN_NAME, token)
}

