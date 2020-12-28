import React from 'react';

import { View,  Image} from 'react-native';
import soundImage from './sound-volume3.png'

const StopImage = () => (
    <View style={{alignItems:'center'}}>
        <Image 
            source={soundImage}
            resizeMode={'center'}
            style={{
                marginTop: 15,
                width: 30,
                height: 30,
                borderRadius: 5
            }}
        
        />
    </View>
)

export default StopImage;