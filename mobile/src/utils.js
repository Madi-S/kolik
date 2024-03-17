export const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
