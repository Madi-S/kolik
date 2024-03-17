import { WLC_SET_CURRENT_CARD, WLC_INCR_CURRENT_INDEX, WLC_DISABLE_SHOW_ON_START } from './types'

const initialState = {
    currIndex: 0,
    showOnStart: true,
    currCard: { text: '', imgSrc: '' }
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case WLC_SET_CURRENT_CARD:
            return { ...state, currCard: action.card }

        case WLC_INCR_CURRENT_INDEX:
            return typeof action.index === 'number' 
            ? { ...state, currIndex: action.index }
            : {...state, currIndex: state.currIndex + 1}

        case WLC_DISABLE_SHOW_ON_START:
            return {...state, showOnStart: false}

        default:
            return state
    }
}
