import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text ,StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { Colors, LogoText } from './tools';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions'


const SideDrawerCustom = (props) => {
    const dispatch = useDispatch();
    const mainOptions = [
        { title:'Home',location:"Home" },
        // { title: 'Stories',location:"Stories" },
        { title:'Settings',location: "Settings" }
    ]

    return(
        <DrawerContentScrollView {...props}>
            <View>
                <LogoText
                    style={{fontSize:40,textAlign:'center',color:Colors.white}}
                />
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
        backgroundColor: Colors.black,
        borderBottomWidth:1,
        borderBottomColor: Colors.black2,
    }
})


export default SideDrawerCustom;