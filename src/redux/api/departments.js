import axios from "axios";
import {CONSTANTS} from "../../utils/constants";

const getDepartments = () => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_URL}/departments`
    })
}

export const DEPARTMENT_API = {getDepartments};