import {configureStore} from "@reduxjs/toolkit";
import employeesReducer from "./../features/employees/employees-slice";
import departmentsReducer from "./../features/departments/departments-slice";
import rolesReducer from "./../features/roles/roles-slice";

const store = configureStore({
    reducer: {
        employees: employeesReducer,
        departments: departmentsReducer,
        roles: rolesReducer,
    },
    devTools: true,
    preloadedState: {}
});

export default store;