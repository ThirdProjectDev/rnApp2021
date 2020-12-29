import React from 'react';
import { Platform, View } from 'react-native'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Colors,LogoText }from '../utils/tools';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


import FAQScreen from '../components/home/FAQ/index';
import HomeScreen from '../components/home/articles';
import SettingsScreen from "../components/settings/index"
import ArticleScreen from '../components/home/articles/article'

export const Stack = createStackNavigator();

const LeftIcon = () => {
    const navigation = useNavigation()
    return(
        <View style={{margin:10}}>
            <Icon
                name="menufold"
                type="antdesign"
                color={Colors.white}
                onPress={()=> navigation.openDrawer()}
            />
        </View>
    )
}


export const screenOptions = {
    headerTitleAlign:'center',
    headerTintColor: Colors.white,
    headerStyle:{
        backgroundColor: Colors.darkGrey2,
        borderBottomWidth:6,
        borderBottomColor:Colors.red,
        height: Platform.OS === 'ios' ? 110 : 60
    },
    headerTitle:()=> <LogoText style={{fontSize:25}}/>
}

export const FAQStack = () => (
    <Stack.Navigator
        screenOptions={{
            ...screenOptions
        }}
        initialRouteName="FAQ_screen"
    >
        <Stack.Screen name="FAQ_screen" component={FAQScreen} options={{
            headerLeft:(props)=> <LeftIcon/>,
        }}/>
    </Stack.Navigator>
)

export const SettingsStack = () => (
    <Stack.Navigator
        screenOptions={{
            ...screenOptions
        }}
        initialRouteName="Settings_screen"
    >
        <Stack.Screen name="Settings_screen" component={SettingsScreen} options={{
            headerLeft:(props)=> <LeftIcon/>,
        }}/>
    </Stack.Navigator>
)

export const HomeStack = () => (
    <Stack.Navigator
        screenOptions={{
            ...screenOptions
        }}
        initialRouteName="Home_screen"
    >
        <Stack.Screen name="Home_screen" component={HomeScreen} options={{
            headerLeft:(props)=> <LeftIcon/>,
        }}/>
        <Stack.Screen name="Article_screen" component={ArticleScreen}/>
    </Stack.Navigator>
)