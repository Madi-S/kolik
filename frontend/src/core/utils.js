export function sleep(seconds) {
    new Promise(resolve => setTimeout(resolve, +seconds * 1000))
}

export function clearInputs() {
    document.querySelectorAll('input').forEach(input => (input.value = ''))
}
export function phoneIsValid(phone) {
    return phone
}

export function saveToken(token) {
    localStorage.setItem('token', token)
}

export function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

export function getUser() {
    const user = localStorage.getItem('user')
    if (user) {
        return JSON.parse(user)
    }
}
