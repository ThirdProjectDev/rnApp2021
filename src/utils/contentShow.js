import React, { useState, useEffect, Children } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Highlighter from 'react-native-highlight-words';
import { rain1, rain2, rain3, fire1, fire2, fire3, forest1, forest2, forest3 } from "./sounds"
import { firebase, usersCollection } from "../firebase";

const ContentShow = ({ params }) => {

    const wordsToSearch = [/\b\Fire\b/gi, /\b\Rain\b/gi, /\b\Forest\b/gi]
    const currentUID = firebase.auth().currentUser.uid
    const [rainSound, setRainSound] = useState("")
    const [fireSound, setFireSound] = useState("")
    const [forestSound, setForestSound] = useState("")

    useEffect(() => {
        usersCollection
            .doc(currentUID)
            .get()
            .then(snapshot => {
                const data = snapshot.data()
                setRainSound(data.rain) 
                setFireSound(data.fire) 
                setForestSound(data.forest) 
            })
    }, [])

    const selectSound = (rainSound, fireSound, forestSound) => {
        console.warn(rainSound)
        rainSound.includes("Rain1") ? rain1.play() 
        : rainSound.includes("rain2") ? rain2.play() 
        : rainSound.includes("Rain3") ? rain3.play()
        : stopTheNoise()
    }

    const stopTheNoise = () =>{
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

    return (
        <View>
            <View style={{ padding: 10 }}>
                <Text style={styles.articleTitle}>
                    {params.postData.title}
                </Text>
                {/* <Text style={styles.articleContent}> */}
                <Highlighter
                    highlightStyle={{ backgroundColor: 'yellow' }}
                    searchWords={wordsToSearch}
                    textToHighlight={params.postData.content.replace(/<p>/g, "").replace(/<\/p>/g, "\n\n")}
                    onPressHighlightedText={() => selectSound(rainSound, fireSound, forestSound)}
                    onPressNormalText={() => stopTheNoise()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    articleTitle: {
        fontSize: 30,
        marginBottom: 30,
        fontWeight: '300',
        color: '#444444'
    },
    articleContent: {
        fontSize: 18,
        color: '#444444'
    }
})

export default ContentShow;

// import React, { Component } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import Highlighter, { textToHighlight } from 'react-native-highlight-words';
// import { rain1, rain2, rain3, fire1, fire2, fire3, forest1, forest2, forest3 } from "./sounds"
// import { firebase, usersCollection } from "../firebase";

// class ContentShow extends Component {
//     state = {
//         rainSound: "",
//         fireSound: "",
//         forestSound: "",
//         wordsToSearch: [/\b\Fire\b/gi, /\b\Rain\b/gi, /\b\Forest\b/gi],
//         currentUID: firebase.auth().currentUser.uid
//     }
//     //     const wordsToSearch = [/\b\Fire\b/gi, /\b\Rain\b/gi, /\b\Forest\b/gi]
//     //     const currentUID = firebase.auth().currentUser.uid
//     // const [rainSound, setRainSound] = useState("")
//     // const [fireSound, setFireSound] = useState("")
//     // const [forestSound, setForestSound] = useState("")

//     // useEffect(() => {
//     //     usersCollection
//     //         .doc(currentUID)
//     //         .get()
//     //         .then(snapshot => {
//     //             const data = snapshot.data()
//     //             setRainSound(data.rain) 
//     //             setFireSound(data.fire) 
//     //             setForestSound(data.forest) 
//     //         })
//     // }, [])

//     componentDidMount() {
//         usersCollection
//             .doc(this.state.currentUID)
//             .get()
//             .then(snapshot => {
//                 const data = snapshot.data()
//                 this.setState({rainSound: data.rain, fireSound: data.fire, forestSound: data.forest})
//             })
//     }

//     selectSound = (rainSound, fireSound, forestSound) => {
//         console.warn(rainSound)
//         console.warn(this.children)
//         rainSound.includes("Rain1") ? rain1.play()
//             : rainSound.includes("Rain2") ? rain2.play()
//                 : rainSound.includes("Rain3") ? rain3.play()
//                     : stopTheNoise()
//     }
//     stopTheNoise = () => {
//         rain1.stop()
//         rain2.stop()
//         rain3.stop()
//         fire1.stop()
//         fire2.stop()
//         fire3.stop()
//         forest1.stop()
//         forest2.stop()
//         forest3.stop()
//     }
//     render() {
//         console.warn(this.props)
//         return (
//             <View>
//                 <View style={{ padding: 10 }}>
//                     <Text style={styles.articleTitle}>
//                         {this.props.params.postData.title}
//                     </Text>
//                     {/* <Text style={styles.articleContent}> */}
//                     <Highlighter
//                         highlightStyle={{ backgroundColor: 'yellow' }}
//                         searchWords={this.state.wordsToSearch}
//                         textToHighlight={this.props.postData.content.replace(/<p>/g, "").replace(/<\/p>/g, "\n\n")}
//                         //there is no way to pass the event like in react for web 
//                         // we need to figure out how to identify the word that is being highlighted if not there is no way to
//                         //whatever is passed to onPressHighlightedText is invoked when there is an onPress event
//                         onPressHighlightedText={() => selectSound(this.state.rainSound, this.state.fireSound, this.state.forestSound)}
//                         onPressNormalText={() => stopTheNoise()}
//                     />
//                 </View>
//             </View>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     articleTitle: {
//         fontSize: 30,
//         marginBottom: 30,
//         fontWeight: '300',
//         color: '#444444'
//     },
//     articleContent: {
//         fontSize: 18,
//         color: '#444444'
//     }
// })

// export default ContentShow;