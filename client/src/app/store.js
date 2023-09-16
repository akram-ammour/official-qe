import { configureStore, createSlice } from '@reduxjs/toolkit'
import viewReducer from '../features/viewSlice'
// import examReducer from "../features/ExamSlice"
import authReducer from '../features/authSlice'
import themeReducer from "../features/themeSlice"
import moduleReducer from '../features/modules'
// import examcoursesReducer from '../features/examcoursesSlice'
import questionsReducer from '../features/questionsSlice'


export const store = configureStore({
    reducer:{
      view:viewReducer,
      auth:authReducer,
      theme:themeReducer,
      module:moduleReducer,
      questions:questionsReducer,
    },

})
