
import React, { Component } from 'react';
import Slider from "@react-native-community/slider"
import { Picker } from "@react-native-community/picker"
import { rain1, fire1, fire2, fire3, rain2, rain3, forest1, forest2, forest3 } from "../../utils/sounds"
import { firebase, usersCollection, storiesCollection } from "../../firebase";
import { Tile } from 'react-native-elements';
import { playRainSound, playForestSound, playFireSound, stopFireSound, stopRainSound, stopForestSound} from "../../utils/tools"

// import * as firebase from "firebase";
// import ContentShow from '../../utils/contentShow';

import Ionicons from 'react-native-vector-icons/Ionicons'
// import {Auth, firebase} from "../../App";


// var Sound = require("react-native-sound");
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  PickerIOSComponent
} from 'react-native';
import { connect } from 'react-redux';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

//volume control
rain1.setVolume(50);
fire1.setVolume(.01)
fire2.setVolume(1)
fire3.setVolume(.25)

class SettingsComponent extends Component {
  state = {
    rainSettings: [],
    setting: { fire: 'fire1', forest: 'forest1', rain: 'rain1', email: firebase.auth().currentUser.email, uid: firebase.auth().currentUser.uid },
    fireSettings: [],
    forestSettings: [],
    volumeSettings: [],
    sliderVol: .25
  }

  componentDidMount() {
    const currentUID = firebase.auth().currentUser.uid
    usersCollection
      .doc(currentUID)
      .get()
      .then(snapshot => {
        const data = snapshot.data()
        console.warn(data)
        if (data) {
          this.setState({setting: {email: data.email, uid: data.uid, fire: data.fire, forest: data.forest, rain: data.rain }})
        }
      });
  }


  saveSettings() {
    const newSettings = usersCollection.doc(this.state.setting.uid)
    newSettings.set(this.state.setting)
  }

  

  render() {
    return (
      <>
        <ScrollView style={{ backgroundColor: '#F0F0F0' }}>
          <View>
            <Text
              style={styles.title}
            >
              Settings
            </Text>
            {/* <Tile 
              icon={{ name:'play-circle',type:'font-awesome',color:'black',size:50}}
              /> */}
            <Text
              style={styles.soundSelection}
              icon={{ name:'play-circle',type:'font-awesome',color:'black',size:50}}>Rain&nbsp;
              {/* icon={{ name:'play-circle',type:'font-awesome',color:'#fff',size:50}} */}
             {/* <TouchableHighlight
                    style={styles.logoutBtn}
                    onPress={()=> this.props.navigation.navigate("Auth")}
                  >
                    <Text style={styles.textStyle}>Log Out</Text>
                  </TouchableHighlight> */}
              <TouchableHighlight
                onPress={()=>playRainSound(this.state.setting.rain, this.state.sliderVol)}
                style={styles.playBtns}
                color="#A36F4C"
                icon={{ name:'play-circle',type:'font-awesome',color:'#fff',size:50}}
                size={15}
                label={'play'}
                accessibilityLabel="Button to play rain sound"
              >
                {/* l */}
                <Text>
                  PLAY
                </Text>
                {/* <Ionicons 
                name="megaphone-outline" 
                size={25} 
                color="black"
              /> */}
              </TouchableHighlight>
                &nbsp;
                <TouchableHighlight
                style={styles.stopBtns}
                color="#7C2717"
                onPress={()=>stopRainSound()}
                title="stop"
                accessibilityLabel="Button to stop rain sound"
              >
                <Icon
                  name="fontawesome|sound"
                  size={25}
                  color="red"
                />
                {/* <Ionicons 
                name="rocket" 
                size={25} 
                color="black"
              /> */}
              </TouchableHighlight>
            </Text>

            <Picker
              selectedValue={this.state.setting.rain}
              style={{ height: 50, width: 150 }, styles.pickers}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({setting: {...this.state.setting, rain: itemValue }})
              }>
              <Picker.Item label="Rain 1" value="rain1" />
              <Picker.Item label="Rain 2" value="rain2" />
              <Picker.Item label="Rain 3" value="rain3" />
              {/* <Picker.Item label="Randomize" value="Random" /> */}
            </Picker>
            <Text
              style={styles.soundSelection}>Forest&nbsp;
            <TouchableHighlight
                onPress={()=>playForestSound(this.state.setting.forest, this.state.sliderVol).bind(this)}
                style={styles.playBtns}
                color="#A36F4C"
                size={15}
                accessibilityLabel="Button to play forest sound"
              >
                {/* <Ionicons 
                name="volume-low-outline" 
                size={25} 
                color="white"
              /> */}
              </TouchableHighlight>
                &nbsp;
                <TouchableHighlight
                style={styles.stopBtns}
                color="#7C2717"
                onPress={()=>stopForestSound}
                title="stop"
                accessibilityLabel="Button to stop forest sound"
              >
                {/* <Ionicons 
                name="volume-mute-outline" 
                size={25} 
                color="white"
              /> */}
              </TouchableHighlight>

            </Text>
            <Picker
              selectedValue={this.state.setting.forest}
              style={{ height: 50, width: 150 }, styles.pickers}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({setting: {...this.state.setting, forest: itemValue }})
              }>
              <Picker.Item label="Forest 1" value="forest1" />
              <Picker.Item label="Forest 2" value="forest2" />
              <Picker.Item label="Forest 3" value="forest3" />
              {/* <Picker.Item label="Randomize" value="Random" /> */}
            </Picker>
            <Text
              style={styles.soundSelection}>Fire&nbsp;
              <TouchableHighlight
                onPress={()=>playFireSound(this.state.setting.fire, this.state.sliderVol).bind(this)}
                style={styles.playBtns}
                color="#A36F4C"
                size={15}
                accessibilityLabel="Button to play fire sound"
              >
                {/* <Ionicons 
                name="volume-low-outline" 
                size={25} 
                color="white"
              /> */}
              </TouchableHighlight>
                &nbsp;
                <TouchableHighlight
                style={styles.stopBtns}
                color="#7C2717"
                onPress={()=>stopFireSound}
                title="stop"
                accessibilityLabel="Button to stop fire sound"
              >
                {/* <Ionicons 
                name="volume-mute-outline" 
                size={25} 
                color="white"
              /> */}
              </TouchableHighlight>
            </Text>
            <Picker
              selectedValue={this.state.setting.fire}
              style={{ height: 50, width: 150 }, styles.pickers}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({setting: {...this.state.setting, fire: itemValue }})
              }
            >
              <Picker.Item label="Fire 1" value="fire1" />
              <Picker.Item label="Fire 2" value="fire2" />
              <Picker.Item label="Fire 3" value="fire3" />
              {/* <Picker.Item label="Randomize" value="Random" /> */}
            </Picker>
            <Text h2>
              Volume
            </Text>
            <Slider
              style={{ width: 200, height: 40 }}
              maximumValue={1}
              minimumValue={0}
              step={.25}
              value={.5}
              onValueChange={itemValue =>
                this.setState({ sliderVol: itemValue })}
            />

            <TouchableHighlight
              style={styles.saveBtn}
              color="#7C2717"
              onPress={this.saveSettings.bind(this)}
              title="stop"
              accessibilityLabel="Button to stop fire sound"
            >
              <Text h2>
                Save Settings
            </Text>

            </TouchableHighlight>

            {/* <Text>
          Sound Credit to Zapsplat
        </Text> */}


          </View>
        </ScrollView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  pickers: {
    ...Platform.select({
      ios: {
        margin: 1,
      }
    })
  },
  playBtns: {
    backgroundColor: "#A36F4C",
    color: "pink",
    width: '50%',
  },
  stopBtns: {
    backgroundColor: "#7C2717",
    color: "pink",
    width: '50%',
  },
  saveBtn: {
    backgroundColor: "#A25B2C",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: '30%',
    marginTop: 30,
    width: 110,
  },
  soundSelection: {
    fontSize: 40,
  },
  title: {
    fontSize: 60,
  }
});
function mapStateToProps(state) {
  // console.log(state)
  return {
    News: state.News
  }
}
export default connect(mapStateToProps)(SettingsComponent)

