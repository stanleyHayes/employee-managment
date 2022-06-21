import axios from "axios";
import {CONSTANTS} from "../../utils/constants";

const getEmployees = (query) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_URL}/employees?${query}`,
        headers: {
            'content-type': 'application/json',
        }
    });
}


const getEmployee = (id) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_URL}/employees/${id}`,
        headers: {
            'content-type': 'application/json'
        }
    });
}

export const EMPLOYEES_API = {getEmployees, getEmployee};