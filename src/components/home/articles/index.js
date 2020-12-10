import React from 'react';
import { 
    View, Text, 
    Button, ScrollView,
    TouchableOpacity,StyleSheet 
} from 'react-native';
import { Card } from 'react-native-elements'

const HomeScreen = ({navigation}) => {

    const StoryTitles = [{title: "Jungle Book"}, {title: "Jane Eyre"}, {title: "Little Princess"}]

    const renderCard = () => (

        StoryTitles.map((item) => (
            <TouchableOpacity
                // key = {item.title}
                onPress={()=> navigation.navigate('Article_screen',{
                    id: 'vdhjbd',
                    postData: {title:'sjsjs',content:''}
                })}
            >
                <Card>
                    <Card.Title style={styles.cardTitle}>
                        <Text>{item.title}</Text>
                    </Card.Title>
                </Card>
            </TouchableOpacity>
        ))

    )


    return(
        <ScrollView>
            {renderCard()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardTitle:{
        fontSize:20,
        textAlign:'left'
    },
    cardText:{
        marginBottom:10,
        marginTop:10
    }
})

export default HomeScreen;