import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
    name:"contacts",
    initialState:{
        value: [],
    },
    reducers: {
        addContact: (state, action) => {
            state.value.push(action.payload);
        },
        addAllContacts:(state, action) => {
            state.value=[]
            state.value.push(...action.payload);
        },
    },
});

export const {addContact, addAllContacts} = contactSlice.actions;
export const selectContacts = (state) => state.contacts.value;
export default contactSlice.reducer;
