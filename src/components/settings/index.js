import React, { Component } from "react";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-community/picker";
import { firebase, usersCollection } from "../../firebase";
import {
  showToast,
  playRainSound,
  playForestSound,
  playFireSound,
  stopFireSound,
  stopRainSound,
  stopForestSound,
} from "../../utils/tools";
import PlayImage from "../../utils/playImage";
import StopImage from "../../utils/stopImage";

import { StyleSheet, ScrollView, View, Text, Platform } from "react-native";
import { connect } from "react-redux";
import { TouchableHighlight } from "react-native-gesture-handler";


class SettingsComponent extends Component {
  state = {
    setting: {
      fire: "fire1",
      forest: "forest1",
      rain: "rain1",
      volume: .5,
      email: firebase.auth().currentUser.email,
      uid: firebase.auth().currentUser.uid,
    },
  };

  componentDidMount() {
    const currentUID = firebase.auth().currentUser.uid;
    usersCollection
      .doc(currentUID)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        console.warn(data);
        if (data) {
          this.setState({
            setting: {
              email: data.email,
              uid: data.uid,
              fire: data.fire,
              forest: data.forest,
              rain: data.rain,
              volume: data.volume
            },
          });
        }
      });
  }

  saveSettings() {
    const newSettings = usersCollection.doc(this.state.setting.uid);
    newSettings.set(this.state.setting);
    showToast("success", "Settings Saved!")
  }

  render() {
    return (
      <>
        <ScrollView style={{ backgroundColor: "#F0F0F0" }}>
          <View>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.soundSelection}>
              Rain&nbsp;
              <TouchableHighlight
                onPress={() =>
                  playRainSound(this.state.setting.rain, this.state.setting.volume)
                }
                icon={{
                  name: "play-circle",
                  type: "font-awesome",
                  color: "#fff",
                  size: 50,
                }}
                size={15}
                label={"play"}
                accessibilityLabel="Button to play rain sound"
              >
                <PlayImage />
              </TouchableHighlight>
              &nbsp;
              <TouchableHighlight
                onPress={() => stopRainSound()}
                title="stop"
                accessibilityLabel="Button to stop rain sound"
              >
                <StopImage />
              </TouchableHighlight>
            </Text>

            <Picker
              selectedValue={this.state.setting.rain}
              style={({ height: 50, width: 150 }, styles.pickers)}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  setting: { ...this.state.setting, rain: itemValue },
                })
              }
            >
              <Picker.Item label="Rain 1" value="rain1" />
              <Picker.Item label="Rain 2" value="rain2" />
              <Picker.Item label="Rain 3" value="rain3" />
              <Picker.Item label="Randomize" value="Random" />
            </Picker>
            <Text style={styles.soundSelection}>
              Forest&nbsp;
              <TouchableHighlight
                onPress={() =>
                  playForestSound(
                    this.state.setting.forest,
                    this.state.setting.volume
                  )
                }
                size={15}
                accessibilityLabel="Button to play forest sound"
              >
                <PlayImage />
              </TouchableHighlight>
              &nbsp;
              <TouchableHighlight
                onPress={() => stopForestSound()}
                title="stop"
                accessibilityLabel="Button to stop forest sound"
              >
                <StopImage />
              </TouchableHighlight>
            </Text>
            <Picker
              selectedValue={this.state.setting.forest}
              style={({ height: 50, width: 150 }, styles.pickers)}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  setting: { ...this.state.setting, forest: itemValue },
                })
              }
            >
              <Picker.Item label="Forest 1" value="forest1" />
              <Picker.Item label="Forest 2" value="forest2" />
              <Picker.Item label="Forest 3" value="forest3" />
              <Picker.Item label="Randomize" value="Random" />
            </Picker>
            <Text style={styles.soundSelection}>
              Fire&nbsp;
              <TouchableHighlight
                onPress={() =>
                  playFireSound(this.state.setting.fire, this.state.setting.volume)
                }
                size={15}
                accessibilityLabel="Button to play fire sound"
              >
                <PlayImage />
              </TouchableHighlight>
              &nbsp;
              <TouchableHighlight
                onPress={() => stopFireSound()}
                title="stop"
                accessibilityLabel="Button to stop fire sound"
              >
                <StopImage />
              </TouchableHighlight>
            </Text>
            <Picker
              selectedValue={this.state.setting.fire}
              style={({ height: 50, width: 150 }, styles.pickers)}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  setting: { ...this.state.setting, fire: itemValue },
                })
              }
            >
              <Picker.Item label="Fire 1" value="fire1" />
              <Picker.Item label="Fire 2" value="fire2" />
              <Picker.Item label="Fire 3" value="fire3" />
              <Picker.Item label="Randomize" value="Random" />
            </Picker>
            <Text h2>Volume</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              maximumValue={1}
              minimumValue={0}
              step={0.25}
              value={this.state.setting.volume}
              onValueChange={(itemValue) =>
                this.setState({ setting: {...this.state.setting, volume: itemValue }, })
              }
            />

            <TouchableHighlight
              style={styles.saveBtn}
              color="#7C2717"
              onPress={
                this.saveSettings.bind(this)

              }
              title="stop"
              accessibilityLabel="Button to stop fire sound"
            >
              <Text h2>Save Settings</Text>
            </TouchableHighlight>

            {/* <Text
            >
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
      },
    }),
  },
  saveBtn: {
    backgroundColor: "#A25B2C",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: "30%",
    marginTop: 30,
    width: 110,
  },
  soundSelection: {
    fontSize: 40,
  },
  title: {
    fontSize: 60,
  },
});
function mapStateToProps(state) {
  return {
    News: state.News,
  };
}
export default connect(mapStateToProps)(SettingsComponent);
