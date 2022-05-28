let TOKEN = null
let USER_ID = null

export const setToken = value => {
    TOKEN = value
}

export const setUserId = value => {
    USER_ID = value
}

export const getUserId = () => {
    return USER_ID
}

export const getToken = () => {
    return TOKEN
}
