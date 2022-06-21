import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {EMPLOYEES_API} from "../../api/employees";

const initialState = {
    employees: [],
    employeeDetail: null,
    employeeError: null,
    employeeMessage: null,
    employeeLoading: false,
    count: 0
}


const getEmployees = createAsyncThunk('employees/get', async ({query}, {rejectWithValue}) => {
    try {
        const response =  await EMPLOYEES_API.getEmployees(query);
        return response.data
    }catch (e) {
        const {message} = e.response.data;
        return rejectWithValue(message);
    }
});

const getEmployee = createAsyncThunk('employee/get', async ({id}, {rejectWithValue}) => {
    try {
        const response =  await EMPLOYEES_API.getEmployee(id);
        return response.data;
    }catch (e) {
        const {message} = e.response.data;
        rejectWithValue(message);
    }
})

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getEmployees.pending, (state) => {
            state.employeeLoading = true;
            state.employeeError = null;
        }).addCase(getEmployees.fulfilled, (state, action) => {
            state.employeeLoading = false;
            state.employeeError = null;
            state.employees = action.payload.data;
            state.employeeMessage = action.payload.message;
            state.count = action.payload.count
        }).addCase(getEmployees.rejected, (state, action) => {
            state.employeeLoading = false;
            state.employeeError = action.payload;
            state.employees = [];
        }).addCase(getEmployee.pending, (state) => {
            state.employeeLoading = true;
            state.employeeError = null;
        }).addCase(getEmployee.fulfilled, (state, action) => {
            state.employeeLoading = false;
            state.employeeError = null;
            state.employeeDetail = action.payload.data;
            state.employeeMessage = action.payload.message;
        }).addCase(getEmployee.rejected, (state, action) => {
            state.employeeLoading = false;
            state.employeeError = action.payload;
            state.employeeDetail = null;
        })
    }
});

export const selectEmployee = state => state.employees;
export const EMPLOYEES_ACTION_CREATORS = {getEmployees, getEmployee};
export default employeesSlice.reducer;