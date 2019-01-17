import { SHOW_ONEDAY, DATA_RES, SHOW_ERROR } from '../actions/weather-actions';

function weatherReducer(state='', { type, payload }) {
    switch(type) {
        case SHOW_ONEDAY:
            return payload.data;
        case SHOW_ERROR:
            return payload.data;
        case DATA_RES:
            if (!payload.data){
                return null;
            } else {
                return payload.data;
            }
        default:
            return state;
    }
}

export default weatherReducer;