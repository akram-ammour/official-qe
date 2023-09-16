import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    Questions:[],
    currentQuestionIndex:0,
    mode:null,
    modeId:null
}

export const questionsSlice = createSlice({
    name:"questions",
    initialState,
    reducers:{
        setQuestions: (state,action) =>{
            state.Questions = action.payload
        },
        setCurrentQuestion: (state,action) =>{
            state.currentQuestionIndex = action.payload
        },
        setCurrentMode: (state,action) =>{
            state.mode = action.payload
        },
        setModeId: (state,action) =>{
            state.modeId = action.payload
        },
        resetQuestions:(state) =>{
            state.Questions = []
        },
        nextQuestion:(state) => {
            const lastIndex = state.Questions.length - 1
            if (state.currentQuestionIndex !== lastIndex) {
                // check if question has children if yes then do that
                if(state.Questions[state.currentQuestionIndex]?.Children.length !== 0){
                    const isLastQuestion = (state.currentQuestionIndex + state.Questions[state.currentQuestionIndex]?.Children.length) === lastIndex
                    // checking if question group is not last
                    if(!isLastQuestion){
                        state.currentQuestionIndex = state.currentQuestionIndex + state.Questions[state.currentQuestionIndex]?.Children.length  + 1
                    }
                }
                else{
                    state.currentQuestionIndex = state.currentQuestionIndex + 1
                }
            }
        },
        prevQuestion:(state) => {
            const firstIndex = 0
            if (state.currentQuestionIndex !== firstIndex ) {
                const prevQuestionParentId = state.Questions[state.currentQuestionIndex - 1]?.ParentId

                if(prevQuestionParentId !== null){
                    const parentIndex = Number(Object.keys(state.Questions).find(key => state.Questions[key].Id === prevQuestionParentId))
                    
                    state.currentQuestionIndex = parentIndex
                }
                else{
                    state.currentQuestionIndex = state.currentQuestionIndex - 1
                }
            }
        }
        
    }

})

export const {setCurrentQuestion,setQuestions,setCurrentMode,resetQuestions,setModeId,nextQuestion,prevQuestion} = questionsSlice.actions;
export default questionsSlice.reducer;

