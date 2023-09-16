import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title:"My Progress",
    subTitle:"view your Progress by class",
    isQcm:false,
    isSidebar:true,
}
export const viewSlice = createSlice({
    name:"view",
    initialState,
    reducers:{
        update:(state,action)=>{
            return {...state,...action.payload}
        },
        setIsSIdeBar:(state) =>{
            state.isSidebar = !state.isSidebar
        }
    }
})

export const {update,setIsSIdeBar} = viewSlice.actions 
export default viewSlice.reducer