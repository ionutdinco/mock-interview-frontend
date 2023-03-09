import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
    name:"quiz",
    initialState:{
        value: []
    },
    reducers:{
        AddQuiz: (state, action) => {
          state.value.push(action.payload);
        },

        AddAllQuiz: (state, action) => {
            state.value = [];
            state.value.push(...action.payload);
          }

    }

});

export default quizSlice.reducer;
export const {AddQuiz, AddAllQuiz} = quizSlice.actions;
export const selectQuiz = (state) => state.quiz.value;