import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: {
        resetSearchString: 0,
    }
};

const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        resetSearchString(state, action) {
            state.search.resetSearchString = action.payload;

        }
    }
})

export const { resetSearchString } = utilsSlice.actions;
export const utilsReducer = utilsSlice.reducer;

