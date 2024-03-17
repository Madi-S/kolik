// import { takeEvery, put, call } from 'redux-saga/effects'
// import { showLoader, hideLoader, showAlert } from './actions'
// import { REQUEST_POSTS, FETCH_POSTS } from './types'
// import { sleep } from '../utils'

// const URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5'

// export function* sagaWatcher() {
//     yield takeEvery(REQUEST_POSTS, sagaWorker)
// }

// function* sagaWorker() {
//     yield put(showLoader())
//     let payload
//     try {
//         payload = yield call(fetchPosts)
//     } catch (e) {
//         yield put(
//             showAlert('Something went wrong with the server, try again later')
//         )
//         yield put(hideLoader())
//         return
//     }
//     yield put({ type: FETCH_POSTS, payload })
//     yield put(hideLoader())
// }

// async function fetchPosts() {
//     const response = await fetch(URL)
//     await sleep(0.5)
//     return await response.json()
// }
