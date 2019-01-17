export const SHOW_POSITION = 'positions:showPosition';
export const SHOW_ERROR = 'positions:showError';


export function showPosition(posLat, posLng) {
    return {
        type: SHOW_POSITION,
        payload: {
            position: {
                latitude: posLat,
                longitude: posLng
            }
        }
    }
}

export function showError() {
    return {
        type: SHOW_ERROR,
        payload: {
            position: 'ERROR!!'
        }
    }
}

