import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROLES_API} from "../../api/roles";

const initialState = {
    roles: [],
    roleLoading: false,
    roleError: null
};

const getRoles = createAsyncThunk('roles/get', async ({query}, {rejectWithValue}) => {
    try {
        const response = await ROLES_API.getRoles(query);
        return response.data;
    } catch (e) {
        const {message} = e.response.data;
        rejectWithValue(message);
    }
});

const rolesSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getRoles.pending, state => {
            state.roleLoading = true;
            state.roleError = null;
        }).addCase(getRoles.fulfilled, (state, action) => {
            state.roleLoading = false;
            state.roleError = null;
            state.roles = action.payload.data;
        }).addCase(getRoles.rejected, (state, action) => {
            state.roleLoading = false;
            state.roleError = action.payload;
        });
    }
});

export const selectRole = state => state.roles;
export const ROLE_ACTION_CREATORS = {getRoles};
export default rolesSlice.reducer;