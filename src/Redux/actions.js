import * as types from './actionTypes';
import _ from 'lodash';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const COOKIE_NAME = 'hoursList';


export function getHourReport() {
    if (!cookies.get(COOKIE_NAME)) {
        cookies.set(COOKIE_NAME, mockupData, { path: '/' });
    }
    return {
        type: types.FETCH_HOUR_LIST_SUCCESS,
        payload: sumMockData()
    }
}

function sumMockData() {
    let monthReport = {};

    const data = cookies.get(COOKIE_NAME) || [];
    data.forEach(item => {
        const month = new Date(item.date).getMonth();
        let user = monthReport[month + item.username] || {};
        user.countDays = isNaN(user.countDays) ? 1 : user.countDays + 1;
        user.username = item.username;
        const sum = item.end - item.start;
        user.sum = isNaN(user.sum) ? sum : user.sum + sum;
        if (sum - 8 > 0) user.extra = isNaN(user.extra) ? sum - 8 : user.extra + (sum - 8);
        user.month = month + 1;
        user.avg = user.sum / user.countDays;
        monthReport[month + item.username] = user;
    })

    return _.map(monthReport, (item) => item);

}

export function detailChanged(key, value) {
    return {
        type: types.DETAIL_CHANGED,
        payload: { key, value }
    }
}

export function saveData(data) {
    let err = [];
    if (!data.username) err.push('Please fill your email address');
    else if (!validateEmail(data.username)) err.push('This is not valid email address');
    if (!data.date) err.push('Please choose a date');
    if (!data.start) err.push('Please fill a start hour');
    else if (isNaN(data.start)) err.push('Start time must be a number');
    else if (data.start >= data.end) err.push('End time must be bigger then start time')
    if (!data.end) err.push('Please fill a end hour');
    else if (isNaN(data.start)) err.push('End time must be a number');

    if (err.length > 0) {
        console.log(data);
        return {
            type: types.DATA_ERROR,
            payload: err
        }
    } else {
        let cookieData = cookies.get(COOKIE_NAME) || [];
        cookieData.push(data);
        cookies.set(COOKIE_NAME, cookieData, { path: '/' });
        return {
            type: types.DATA_SAVED_SUCCESS,
            payload: cookieData
        }
    }
}

export function clearFormData() {
    return {
        type: types.CLEAR_FORM_DATA
    }
}

export function sortTableBy(propName) {
    return function (dispatch, getState) {
        dispatch({
            type: types.SORT_CHANGED,
            payload: propName
        });
        dispatch({
            type: types.FILTER_CHANGED,
            payload: {}
        });

        const sortedData = sumMockData().sort(function (a, b) {
            return (
                (a[propName] || 0) > (b[propName] || 0)) ? 1 :
                (((b[propName] || 0) > (a[propName] || 0)) ? -1 : 0
                );
        });

        dispatch({
            type: types.FILTERD_LIST_SUCCESS,
            payload: sortedData
        });
    }

}

export function filterTableBy(propName, searchText) {
    return function (dispatch) {
        dispatch({
            type: types.SORT_CHANGED,
            payload: ''
        });

        dispatch({
            type: types.FILTER_CHANGED,
            payload: { propName, searchText }
        });

        const filteredData = sumMockData().filter(
            item =>
                (item[propName] || '').toString().toLowerCase()
                    .includes((searchText || '').toLowerCase())
        );

        dispatch({
            type: types.FILTERD_LIST_SUCCESS,
            payload: filteredData
        });
    }
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const mockupData = [
    { date: "2018-07-25", username: "jack@gmail.com", start: "08", end: "16" },
    { date: "2018-07-23", username: "jack@gmail.com", start: "09", end: "17" },
    { date: "2018-07-22", username: "json@gmail.com", start: "10", end: "15" },
    { date: "2018-08-05", username: "json@gmail.com", start: "08", end: "17" },
    { date: "2018-08-09", username: "jack@gmail.com", start: "07", end: "15" },
];


