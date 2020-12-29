import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Highlighter from 'react-native-highlight-words';
import { firebase, usersCollection } from "../firebase";
import { playRainSound, playForestSound, playFireSound } from "./tools"
import { rain1, fire1, fire2, fire3, rain2, rain3, forest1, forest2, forest3 } from "./sounds"

class ContentShow extends Component {
    state = {
        rainSound: "",
        fireSound: "",
        forestSound: "",
        wordsToSearch: [/\b\Fire\b/gi, /\b\Rain\b/gi, /\b\Forest\b/gi],
        currentUID: firebase.auth().currentUser.uid,
        volume: 0
    }
    componentDidMount() {
        usersCollection
        .doc(this.state.currentUID)
        .get()
        .then(snapshot => {
            const data = snapshot.data()
                this.setState({ 
                    rainSound: data.rain, 
                    fireSound: data.fire, 
                    forestSound: data.forest, 
                    volume: data.volume, 
                    currentUID: data.uid 
                })
            })
        }
        
        selectSound() {
            //inside of selectSound this refers to the element that is being clicked on not to ContentShow
            // console.warn(this)
        const currentUID = firebase.auth().currentUser.uid
        usersCollection
            .doc(currentUID)
            .get()
            .then(snapshot => {
                const data = snapshot.data()
                this.children === 'fire' ? playFireSound(data.fire, data.volume)
                    : this.children === 'rain' ? playRainSound(data.rain, data.volume)
                        : this.children === 'forest' ? playForestSound(data.forest, data.volume)
                            : console.warn("No sound associated with this word")
            })

    }

    stopTheNoise = () => {
        rain1.stop()
        rain2.stop()
        rain3.stop()
        fire1.stop()
        fire2.stop()
        fire3.stop()
        forest1.stop()
        forest2.stop()
        forest3.stop()
    }

    render() {
        return (
            <View>
                <View style={{ padding: 10 }}>
                    <Text style={styles.articleTitle}>
                        {this.props.params.postData.title}
                    </Text>
                    <Text style={styles.articleContent}>
                        <Highlighter
                            highlightStyle={{ backgroundColor: 'yellow' }}
                            searchWords={this.state.wordsToSearch}
                            textToHighlight={this.props.params.postData.content.replace(/<p>/g, "").replace(/<\/p>/g, "\n\n")}
                            onPressHighlightedText={(this.selectSound)}
                            onPressNormalText={() => this.stopTheNoise()}
                        />
                    </Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    articleTitle: {
        fontSize: 30,
        marginBottom: 30,
        fontWeight: '300',
        color: '#444444'
    },
    articleContent: {
        fontSize: 16,
        color: '#444444'
    }
})

export default ContentShow;