import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useContext } from 'react'
import { UserContext } from '../Context/UserContext';

export default function Home() {
  const [value, setValue] = useState(1)
  const { isLoggedIn, setUserState } = useContext(UserContext)
  console.log({ isLoggedIn, setUserState});
  const dread = value === 5 ? 5 :
                  value === 4 ? 4 :
                    value === 3 ? 3 :
                      value === 2 ? 2 : 1
  console.log(dread);
  const displayValue = () => {
    return (value === 5 ? <Text>Value is 5</Text> :
             value === 4 ? <Text>Value is 4</Text> :
              value === 3 ? <Text>Value is 3</Text> :
                value === 2 ? <Text>Value is 2</Text> :
                  <Text>Value is 1</Text> )
  }
  return (
    // <View>
    //   <Text>5</Text>
    // </View>
    <View>
      {
        (value === 5 ? <Text>Value is 5</Text> :
        value === 4 ? <Text>Value is 4</Text> :
         value === 3 ? <Text>Value is 3</Text> :
           value === 2 ? <Text>Value is 2</Text> :
             <Text>Value is 1</Text> )
      }
    </View>
  )
}

// const styles = StyleSheet.create({})