import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text as T, TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { appendTodo, deleteTodo, setTodos } from "./store/todoSlice";
import AsyncStorage from "@react-native-async-storage/async-storage"

const Text = ({children, textColor = "white", style}) =>{
  return (
    <T style={[styles.text, {color: textColor}, style]}>
      {children}
    </T>
  )
}


const Todo = ({todo, onDelete, id}) =>{

  return (
    <View style={styles.todo}>
      <Text style={{padding: 10}}>
        {todo}
      </Text>
      <Btn
        onPress={() => {
          onDelete(id)
        }}
        style={{width: 45, height: 45, backgroundColor: "black"}}>SİL</Btn>
    </View>
  )
}


const Input = ({children, value, onChangeText, style, placeholder, placeholderTextColor}) =>{
  return (
    <TextInput
      value={value} 
      onChangeText={onChangeText} 
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
    />
  )
}

const Btn = ({children, style, onPress}) =>{
  return (
    <TouchableHighlight
     style={[styles.btn, style]}
     onPress={onPress}
     >
      <Text>
        {children}
      </Text>
    </TouchableHighlight>
  )
}

const App = () =>{

  const [text, setText] = useState("")
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todo.todos)

  const onSubmit = () =>{
    if(text.length > 0){
      dispatch(appendTodo(text))
    }
  }

  const onDelete = (id) =>{
    dispatch(deleteTodo(id))
  }

  useEffect(() =>{
    (async () =>{
      const todos = await AsyncStorage.getItem("todos")
      const tds = JSON.parse(todos)
      dispatch(setTodos(tds.todos))
    })()
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.valueArea}>
        <Input
         value={text}
          onChangeText={t => setText(t.length > 0 ? t : "")} 
          style={styles.input} 
          placeholder={"Todo"}
          placeholderTextColor={"black"}
          />
          <Btn 
          style={{alignSelf: "center"}} 
          onPress={onSubmit}
          
          >
            Todo Ekle
          </Btn>
      </View>
      <View style={styles.todos}>
        {todos.length > 0 ? todos.map((todo, i) => {
          return <Todo key={i} todo={todo.todo} id={i} onDelete={onDelete} />
        }) : <View style={styles.center}>
          <Text textColor={"black"}>Henüz todo eklememişsin!</Text>
        </View>}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  todo: {
    width: "90%",
    minHeight: 50,
    borderRadius: 10,
    backgroundColor: "#9683ec",
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  todos: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10
  },
  input: {
    borderWidth: 2,
    borderColor: "#9683ec",
    width: "95%",
    height: 50,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    color: "white"
  },
  valueArea: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  btn: {
    width: "50%",
    height: 50,
    borderRadius: 20,
    backgroundColor: "#9683ec",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5
  }
})

export default App