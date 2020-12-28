import React from 'react';
import { render } from 'react-dom';
import { View, Text, Button, ScrollView, ActivityIndicator,StyleSheet } from 'react-native';
import { Tile } from 'react-native-elements';
import { Card } from 'react-native-elements';

const VideosScreen = ({navigation}) => {

    const FAQ  = [
        {
            id: 1,
            title: "How does this App work?",
            body: "We have a selection of excertps from various stories, and when navigating to these excerpts you can click on a highlighted word to play an associated sound."
        },
        {
            id: 2,
            title: "What is the purpose of this App?",
            body: "This app is a demo of a potential read-along app. We hope to continue to improve upon our idea until it is a fully-fledged app."
        },
        {
            id: 3,
            title: "Can I upload my own stories?",
            body: "Currently you cannot upload your own story/excerpt."
        }
    ]

    const renderFAQ = () => (
        // <Tile
        //     imageSrc={{uri:'https://picsum.photos/200/300'}}
        //     title='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        //     icon={{ name:'play-circle',type:'font-awesome',color:'#fff',size:50}}
        //     contentContainerStyle={styles.contentContainerStyle}
        //     containerStyle={styles.containerStyle}
        //     titleStyle={{fontSize:15}}
        //     onPress={()=> navigation.navigate('VideoScreen',{
        //         id:'hsdvhsjdv',
        //         postData:{}
        //     })}
        // />

        FAQ.map((item)=>(
            <Card key={item.id}>
                <Card.Title style={styles.cardTitle}>
                    <Text>{item.title}</Text>
                </Card.Title>

                <Card.Divider />

                <Text style={styles.cardText}>
                    {item.body}
                </Text>
            </Card>
        ))
    )


    return(
        <ScrollView>
            <View style={{padding:20}}>
                {renderFAQ()}
            </View>
            {/* <Button
                title="see article"
                onPress={()=> navigation.navigate('Video_screen')}
            /> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardTitle:{
        fontSize:15,
        textAlign:'left'
    },
    cardText:{
        marginBottom:10,
        marginTop:10
    },
    contentContainerStyle:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#e1e8ee',
        shadowColor:'rgba(0,0,0,.2)'
    },
    containerStyle:{
        width:'100%',
        height:250,
        marginBottom:15
    }
})



export default VideosScreen;