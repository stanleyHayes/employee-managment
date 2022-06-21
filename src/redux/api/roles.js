import axios from "axios";
import {CONSTANTS} from "../../utils/constants";

const getRoles = (query) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_URL}/roles?${query}`
    })
}

export const ROLES_API = {getRoles};