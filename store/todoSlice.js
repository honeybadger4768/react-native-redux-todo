import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createTodo = ({todo}) =>{
    return {
        completed: false,
        todo: todo
    }
}

const initialState ={
    todos: []
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos: (state, action) =>{
            state.todos = action.payload
        },
        appendTodo: (state, action) =>{
            const todo = createTodo({todo: action.payload})
            state.todos = [...state.todos, todo]
            AsyncStorage.setItem("todos", JSON.stringify({todos: state.todos}))
        },
        deleteTodo: (state, action) =>{
            const id = action.payload
            const tds = state.todos.filter((s, i) => i !== id)
            state.todos = tds
            AsyncStorage.setItem("todos", JSON.stringify({todos: state.todos}))
        },
        completeTodo: (state, action) =>{
            const id = action.payload
            state.todos[id].completed = !state.todos[id].completed
            AsyncStorage.setItem("todos", JSON.stringify({todos: state.todos}))
        }
    }
})

export const { appendTodo, deleteTodo, setTodos, completeTodo } = todoSlice.actions
export default todoSlice.reducer