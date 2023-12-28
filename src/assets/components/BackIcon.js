import { FontAwesome } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Back } from '../../components/icons';

export default function BackIcon({ navigation }) {
    return (
        <View style={{ height: 'auto', justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={() => {
                    //   console.log(props);
                    const popAction = StackActions.pop(1);
                    navigation.dispatch(popAction);
                }
                }
                style={{
                    height: 50,
                    width: 50,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#000',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                    // marginLeft: 10
                    // alignSelf: "center"
                }}
            >
                {/* <FontAwesome name="chevron-left" size={ 25 } color="white" /> */}
                <Back size={25}/>
            </TouchableOpacity>
        </View>
    )
}
