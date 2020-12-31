import 'react-native-gesture-handler';
import React,{ Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import {autoSignIn} from './store/actions';

import SideDrawerCustom from './utils/customDrawer';
import { Colors } from './utils/tools';

const Drawer = createDrawerNavigator();

import { Stack, HomeStack, FAQStack, screenOptions, SettingsStack } from './routes/stacks';
import AuthScreen from './components/auth';
import ProfileScreen from './components/user/profile/profile';
import SettingsScreen from './components/settings/index';
import Splash from './components/auth/splash';

const MainDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <SideDrawerCustom {...props}/>}
    drawerStyle={{backgroundColor: Colors.darkGrey2}}
  >
    <Drawer.Screen name="Home" component={HomeStack}/>
    <Drawer.Screen name="FAQ" component={FAQStack}/>
    <Drawer.Screen name="Profile" component={ProfileScreen}/>
    <Drawer.Screen name="Settings" component={SettingsStack}/>
  </Drawer.Navigator>
)

class App extends Component{
  state = {
    loading: false
  }

  componentDidMount(){
    this.props.dispatch(autoSignIn())
      .then(()=>{
      this.setState({loading:false})
      })
  }


  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          { this.props.auth.isAuth ? (
            <>
              <Stack.Screen
                name="Main"
                component={ MainDrawer }
                options={{ headerShown:false}}
              />
              <Stack.Screen 
                name="SettingsScreen" 
                component={ SettingsScreen }
                options={{
                  ...screenOptions,
                  headerBackTitleVisible:false
                }}
              />
            </>
          ):(
            this.state.loading ?
            <Stack.Screen
              options={{ headerShown:false}}
              name="Splash"
              component={Splash}
            />
            :
            <Stack.Screen
              options={{ headerShown:false}}
              name="AuthScreen"
              component={AuthScreen}
            />
          )
          }
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const mapStateToProps = state => ({auth: state.auth })
export default connect(mapStateToProps)(App);