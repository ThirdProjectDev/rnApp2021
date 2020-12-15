import React from 'react';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';

export const Colors = {
    'white':'#ffffff',
    'black':'#131418',
    'black2':'#272930',
    'black3':'#1a1a21',
    'grey':'#c8c8c8',
    'red':'#7c2717',
    'darkGrey':'#473d38',
    'darkGrey2':'#2e2724',
    'lightBrown':'#D9C0AB',
    'middleBrown1':'#A36F4C',
    'middleBrown2':'#A25B2C',
    'darkBrown':'#4A3B2C'
}

export const LogoText = (props) => (
    <Text
        style={{
            fontFamily:'Parisienne-Regular',
            color:'#ffffff',
            fontSize:50,
            ...props.style
        }}
    >
        Along With Me
    </Text>
)

export const showToast = (type,text1,text2) => {
    switch(type){
        case 'success':
            Toast.show({
                type: 'success',
                text1,
                text2,
                position: 'bottom',
                visibilityTime: 4000,
                autoHide: true,
                bottomOffset: 50
              });
        break;
        case 'error':
            Toast.show({
                type: 'error',
                text1,
                text2,
                position: 'bottom',
                visibilityTime: 4000,
                autoHide: true,
                bottomOffset: 50
              });
        break;
        default:
        null
    }
}