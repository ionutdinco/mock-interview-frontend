import { createSlice } from "@reduxjs/toolkit";

export const domainSlice = createSlice({
    name:"domain",
    initialState:{
        value: [],
    },
    reducers: {
        addDomain: (state, action) => {
            state.value.push(action.payload);
        },
        addAllDomain:(state, action) => {
            state.value = [];
            state.value.push(...action.payload);
        },
    },
});

export const {addDomain, addAllDomain} = domainSlice.actions;
export const selectDomain = (state) => state.domain.value;
export default domainSlice.reducer;
