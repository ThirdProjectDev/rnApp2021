import React, {Component} from 'react';

import { View,  Image} from 'react-native';
import LogoImage from './along-with-me-logo.png'

const DrawerLogo = () => (
    <View style={{alignItems:'center'}}>
        <Image 
            source={LogoImage}
            resizeMode={'center'}
            style={{
                marginTop: 15,
                width: 200,
                height: 200
            }}
        
        />
    </View>
)

export default DrawerLogo;