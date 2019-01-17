import $ from 'jquery';

export const SHOW_ERROR = 'weather:showError';
export const SHOW_ONEDAY = 'weather:oneDayRequest';
export const DATA_RES = 'weather:resData';

export function showError() {
    return {
        type: SHOW_ERROR,
        payload: {
            data: 'ERROR!!'
        }
    }
}

export function resData(res) {
    console.log('resData func: ', res)
    return {
        type: DATA_RES,
        payload: {
            data: res
        }
    }
}

export function oneDayRequest(posLat, posLng) {
    //Longitude: -117.0497536
    //Latitude: 33.0072064
    //const myUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/dc11d929dc5e5ef61391814ae9f491e1/33.0072064,-117.0497536`
    const newUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/dc11d929dc5e5ef61391814ae9f491e1/${posLat},${posLng}`
    return dispatch => {
        $.ajax({
            url: newUrl,
            success(res) {
                console.log('API res: ', res);
                dispatch(resData(res));
            }, error(error) {
                console.log('error fetching weather data from api. ', error);
                dispatch(showError());
            }
        })
    }
}