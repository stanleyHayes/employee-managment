import {configureStore} from "@reduxjs/toolkit";
import employeesReducer from "./../features/employees/employees-slice";
import departmentsReducer from "./../features/departments/departments-slice";
import rolesReducer from "./../features/roles/roles-slice";
import uiReducer from "./../features/ui/ui-slice";
import {CONSTANTS} from "../../utils/constants";

const store = configureStore({
    reducer: {
        employees: employeesReducer,
        departments: departmentsReducer,
        roles: rolesReducer,
        ui: uiReducer
    },
    devTools: true,
    preloadedState: {
        ui: {
            themeVariant:
                localStorage.getItem(CONSTANTS.OYSTER_EMPLOYEE_MANAGEMENT_THEME_VARIANT) ?
                    JSON.parse(localStorage.getItem(CONSTANTS.OYSTER_EMPLOYEE_MANAGEMENT_THEME_VARIANT)) :
                    'light',
            viewMode: localStorage.getItem(CONSTANTS.OYSTER_EMPLOYEE_MANAGEMENT_VIEW_MODE) ?
                JSON.parse(localStorage.getItem(CONSTANTS.OYSTER_EMPLOYEE_MANAGEMENT_VIEW_MODE)) :
                'grid'
        }
    }
});

export default store;