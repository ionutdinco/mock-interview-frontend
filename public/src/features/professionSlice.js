import { createSlice } from "@reduxjs/toolkit";

export const professionSlice = createSlice({
    name:"profession",
    initialState:{
        value: [],
    },
    reducers: {
        addProfession: (state, action) => {
            state.value.push(action.payload);
        },
        addAllProfession:(state, action) => {
            state.value=[];
            state.value.push(...action.payload);
        },
    },
});

export const {addProfession, addAllProfession} = professionSlice.actions;
export const selectProfession = (state) => state.profession.value;
export default professionSlice.reducer;
