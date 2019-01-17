import { SHOW_POSITION, SHOW_ERROR } from '../actions/pos-action';

function positionReducer(state='', { type, payload }) {
    switch(type) {
        case SHOW_POSITION:
            return payload.position;
        case SHOW_ERROR:
            return payload.position;
        default:
            return state;
    }
}

export default positionReducer;