import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: {
        resetSearchString: 0,
    },

    isMobile: {
        value: false,
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
        }
    }
})

export const { resetSearchString, setIsMobile } = utilsSlice.actions;
export const utilsReducer = utilsSlice.reducer;

