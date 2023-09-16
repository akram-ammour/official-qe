import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    // modules:[],
    sem1:[],
    sem2:[],
    currentId: null,
    currentSemester: 0 ,
}
export const moduleSlice = createSlice({
    name:"modules",
    initialState,
    reducers:{
        setCurrentId:(state,action) =>{
            state.currentId = action.payload
        },
        setCurrentSem:(state,action) =>{
            state.currentSemester = action.payload
        },
        // setModules:(state,action) =>{
        //     state.modules = action.payload
        // },
        setSem1:(state,action) => {
            state.sem1 = action.payload

        },
        setSem2:(state,action) => {
            state.sem2 = action.payload
        },
        next:(state) => {
            if(state.currentSemester !== 1){
                state.currentSemester =  1
            }
        },
        previous:(state) => {
            if(state.currentSemester !== 0){
                state.currentSemester =  0
            }
        }
    }
})

export const {setCurrentId,setModules,setSem1,setSem2,next,previous,setCurrentSem} = moduleSlice.actions 
export default moduleSlice.reducer