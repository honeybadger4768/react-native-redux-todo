import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 0
}

export const counter = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) =>{
            state.value += 1
        },
        decrement: (state) =>{
            state.value -= 1
        },
        waIncrement: (state, action) =>{
            if(typeof action.payload === "number"){
                state.value += action.payload
            }
        },
        waDecrement: (state, action) =>{
            if(typeof action.payload === "number"){
                state.value -= action.payload        
            }
        }
    }
})

export const { increment, decrement, waDecrement, waIncrement } = counter.actions
export default counter.reducer