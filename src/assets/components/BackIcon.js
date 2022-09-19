import { FontAwesome } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

export default function BackIcon({ navigation }) {
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    //   console.log(props);
                    const popAction = StackActions.pop(1);
                    navigation.dispatch(popAction);
                }
                }
                style={{
                    height: 40,
                    width: 40,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginLeft: 10
                    // alignSelf: "center"
                }}
            >
                <FontAwesome name="chevron-left" size={ 25 } color="white" />
            </TouchableOpacity>
        </View>
    )
}
