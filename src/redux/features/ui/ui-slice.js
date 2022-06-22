import {createSlice} from "@reduxjs/toolkit";
import {CONSTANTS} from "../../../utils/constants";

const initialState = {
    themeVariant: 'light',
    viewMode: 'grid'
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            localStorage.setItem(CONSTANTS.OYSTER_EMPLOYEE_MANAGEMENT_THEME_VARIANT, JSON.stringify(state.themeVariant === 'light' ? 'dark' : 'light'));
            state.themeVariant = state.themeVariant === 'light' ? 'dark' : 'light'
        },
        toggleViewMode: (state) => {
            localStorage.setItem(CONSTANTS.OYSTER_EMPLOYEE_MANAGEMENT_VIEW_MODE, JSON.stringify(state.viewMode === 'grid' ? 'list': 'grid'));
            state.viewMode = state.viewMode === 'grid' ? 'list': 'grid'
        }
    }
});

export const selectUI = state => state.ui;
export const UI_ACTION_CREATORS = {...uiSlice.actions};
export default uiSlice.reducer;