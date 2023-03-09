import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../features/postSlice';
import professionReducer from '../features/professionSlice';
import domainReducer from '../features/domainSlice';
import contactsReducer from '../features/contactsSlice';
import quizReducer from '../features/quizSlice';

export default configureStore({
    reducer: {
        post: postReducer,
        domain: domainReducer,
        profession: professionReducer,
        contacts: contactsReducer,
        quiz: quizReducer
    },
});