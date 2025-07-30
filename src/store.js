import {createStore} from 'redux';

const TOGGLE_POWER = 'TOGGLE_POWER';
const CHANGE_DISPLAY = 'CHANGE_DISPLAY';
const CHANGE_VOLUME = 'CHANGE_VOLUME';

const initialState = {
    power: true,
    bank: 'bank1',
    display: '',
    volume: '0.5'
}

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_POWER:
            return { ...state, editVisible: !state.power};
        case CHANGE_DISPLAY:
            return { ...state, display: action.display };
        case CHANGE_VOLUME:
            return { ...state, volume: action.volume };
        default:
            return state;
    }
}

const store = createStore(contentReducer);

export default store;