import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: {
        resetSearchString: 0,
    },

    isMobile: {
        value: false,
    },

    activeTabs: {
        activeId: 0,
        activeType: 'new'
    },

    activePage: 0,
};

const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        resetSearchString(state, action) {
            state.search.resetSearchString = action.payload;
        },

        setIsMobile(state, action) {
            state.isMobile.value = action.payload;
        },

        setActiveTab(state, action) {
            state.activeTabs.activeId = action.payload?.activeId;
            state.activeTabs.activeType = action.payload?.activeType;
        },

        setActivePage(state, action) {
            state.activePage = action.payload;
        }

    }
})

export const { resetSearchString, setIsMobile, setActiveTab, setActivePage } = utilsSlice.actions;
export const utilsReducer = utilsSlice.reducer;

