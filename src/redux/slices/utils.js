import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: {
        resetSearchString: 0,
    },

    isMobile: {
        value: false,
    },

    activeTabs: {
        activeId: 0
    }
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
            state.activeTabs.activeId = action.payload;
        }

    }
})

export const { resetSearchString, setIsMobile, setActiveTab } = utilsSlice.actions;
export const utilsReducer = utilsSlice.reducer;

