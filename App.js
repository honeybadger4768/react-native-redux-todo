import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text as T, StyleSheet, TouchableHighlight, TextInput } from "react-native";
import { decrement, increment, waDecrement, waIncrement } from "./store/counterSlice";

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

const Input = ({ onChangeText, placeholder, phTextColor = "black", value }) =>{
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={phTextColor} 
      value={value}
      onChangeText={onChangeText}
      />
  )
}

const App = () =>{
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const [val, setVal] = useState(0)

  return (
      <View style={styles.container}>
        <Text>{count}</Text>
        <View style={styles.center}>
            <Input placeholder={"Amount"} value={val} onChangeText={t => setVal(t.length > 0 ? t : 0)} />
          <View style={styles.buttons}>
            <Btn textColor={"white"} onPress={() =>{
              dispatch(increment())
            }}>+</Btn>
            <Btn textColor={"white"} onPress={() =>{
              dispatch(decrement())
            }}>-</Btn>
          </View>
          <View style={styles.wa}>
          <Text>With Amount</Text>
            <View style={styles.buttons}>
              <Btn textColor={"white"} onPress={() =>{
                dispatch(waIncrement(parseInt(val)))
              }}>+</Btn>
              <Btn textColor={"white"} onPress={() =>{
                dispatch(waDecrement(parseInt(val)))
              }}>-</Btn>
            </View>
          </View>
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
    justifyContent: "center",
    marginVertical: 20
  },
  btn: {
    width: 100,
    height: 50,
    backgroundColor: "black",
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "75%",
    height: 50,
    borderWidth: 2,
    borderRadius: 15,
    alignSelf: "center",
    paddingHorizontal: 10
  },
  center: {
    width: "100%",
    marginVertical: 50
  },
  wa: {
    alignItems: "center"
  }
})

export default App