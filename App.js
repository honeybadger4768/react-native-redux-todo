import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text as T, StyleSheet, TouchableHighlight } from "react-native";
import { decrement, increment } from "./store/counterSlice";

const Text = ({children, style}) =>{
  return (
    <T style={[styles.text, style]}>
      {children}
    </T>
  )
}

const Btn = ({children, onPress, textColor = "black"}) =>{
  return (
    <TouchableHighlight onPress={onPress} style={styles.btn}>
      <Text style={[{color: textColor}]}>
        {children}
      </Text>
    </TouchableHighlight>
  )
}


const App = () =>{

  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
      <View style={styles.container}>
        <Text>{count}</Text>
        <View style={styles.buttons}>
          <Btn textColor={"white"} onPress={() =>{
            dispatch(increment())
          }}>+</Btn>
          <Btn textColor={"white"} onPress={() =>{
            dispatch(decrement())
          }}>-</Btn>
        </View>
      </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    color: "black"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 75
  },
  btn: {
    width: 100,
    height: 50,
    backgroundColor: "black",
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default App