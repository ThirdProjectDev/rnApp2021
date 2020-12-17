import React from 'react';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { rain1, fire1, fire2, fire3, rain2, rain3, forest1, forest2, forest3 } from "./sounds"


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

export const playRainSound = (setting, sliderVol) => {
    stopRainSound()
    switchSound(setting, sliderVol, rain1, rain2, rain3, "rain1", "rain2", "rain3");
}

export const playForestSound = (setting, sliderVol) => {
    stopForestSound()
    switchSound(setting, sliderVol, forest1, forest2, forest3, "forest1", "forest2", "forest3");
}

export const playFireSound = (setting, sliderVol) => {
    stopFireSound()
    switchSound(setting, sliderVol, fire1, fire2, fire3, "fire1", "fire2", "fire3");
}

export const stopFireSound = () => {
    fire2.stop()
    fire1.stop()
    fire3.stop()
}

export const stopRainSound = () => {
    rain1.stop()
    rain2.stop()
    rain3.stop()
}

export const stopForestSound = () => {
    forest1.stop()
    forest2.stop()
    forest3.stop()
}

export const switchSound = (soundState, sliderVol, sound1, sound2, sound3, value1, value2, value3) => {
    switch (soundState) {
        case value1:
          sound1.play().setVolume(sliderVol);
        //   console.warn("this is 1")
          break;
        case value2:
          sound2.play().setVolume(sliderVol);
          // console.warn("this is 2")
          break;
        case value3:
          sound3.play().setVolume(sliderVol);
          // console.warn("this is 3")
          break;
        case "Random":
          let FireRandomInteger = Math.floor(Math.random() * 3) + 1
          switch (FireRandomInteger) {
            case 1:
              sound1.play().setVolume(sliderVol);
              break;
            case 2:
              sound2.play().setVolume(sliderVol);
              break;
            case 3:
              sound3.play().setVolume(sliderVol);
              break;
            default:
              break;
          }
        default:
          break;
      }
}

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