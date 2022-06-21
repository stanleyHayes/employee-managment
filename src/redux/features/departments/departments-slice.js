import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {DEPARTMENT_API} from "../../api/departments";

const initialState = {
    departments: [],
    departmentLoading: false,
    departmentError: null
};

// eslint-disable-next-line no-empty-pattern
const getDepartments = createAsyncThunk('departments/get', async ({}, {rejectWithValue}) => {
    try {
        const response = await DEPARTMENT_API.getDepartments();
        return response.data;
    } catch (e) {
        const {message} = e.response.data;
        rejectWithValue(message);
    }
});

const departmentsSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getDepartments.pending, state => {
            state.departmentLoading = true;
            state.departmentError = null;
        }).addCase(getDepartments.fulfilled, (state, action) => {
            state.departmentLoading = false;
            state.departmentError = null;
            state.departments = action.payload.data;
        }).addCase(getDepartments.rejected, (state, action) => {
            state.departmentLoading = false;
            state.departmentError = action.payload;
        });
    }
});

export const selectDepartment = state => state.departments;
export const DEPARTMENT_ACTION_CREATORS = {getDepartments};
export default departmentsSlice.reducer;