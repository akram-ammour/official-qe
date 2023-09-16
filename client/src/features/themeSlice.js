import { createSlice } from "@reduxjs/toolkit";
const initialState = {

    Colors:{
        RED:{
            primary:"#7E3737",
            secondary:"#592626",
            ternary:"#B58787"
        },
        YELLOW:{
            primary:"#E1B519",
            secondary:"#826604",
            ternary:"#CAC27B",
        },
        GREEN:{
            primary:"#377E42",
            secondary:"#2C4D20",
            ternary:"#8CB58B",
        },
        BLUE:{
            primary:"#3974AA",
            secondary:"#233B52",
            ternary:"#7B8CCA",
        },
        PURPLE:{
            primary:"#70377E",
            secondary:"#44204D",
            ternary:"#AA8BB5",
        },
        ORANGE:{
            primary:"#DC5B12",
            secondary:"#782C01",
            ternary:"#CAA57B",
        },
        LIGHTBLUE:{
            primary:"#0085FF",
            secondary:"#004987",
            ternary:"#719ABF",
        },
        BLACK:{
            // primary:"#515151",
            primary:"#303030",
            secondary:"#19121B",
            ternary:"#565656",
        },
    },
    Current:"PURPLE",

}
export const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        setCurrent:(state,action)=>{
            state.Current = action.payload
        }
    }
})

export const {setCurrent} = themeSlice.actions 
export default themeSlice.reducer