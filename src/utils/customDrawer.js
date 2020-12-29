import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { Colors } from './tools';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions';
import DrawerLogo from './drawerLogo.js';

const SideDrawerCustom = (props) => {
    const dispatch = useDispatch();
    const mainOptions = [
        { title:'Stories',location:"Home" },
        { title:'FAQ',location:"FAQ" },
        // { title:'Profile',location:"Profile" },
        { title:'Settings',location:"Settings" }
    ]

    return(
        <DrawerContentScrollView {...props}>
            <View>
                <DrawerLogo />
            </View>
            { mainOptions.map((item)=>(
                <Button
                    key={item.location}
                    title={item.title}
                    onPress={()=> props.navigation.navigate(item.location)}
                    buttonStyle={styles.drawerButon}
                    titleStyle={{ width:'100%'}}
                />
            ))}
            <Button
                    title="Logout"
                    onPress={()=> dispatch(logoutUser()) }
                    buttonStyle={styles.drawerButon}
                    titleStyle={{ width:'100%'}}
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    drawerButon:{
        backgroundColor: Colors.darkGrey2,
        borderBottomWidth:1,
        borderBottomColor: Colors.darkGrey,
    }
})

export default SideDrawerCustom;
