import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Highlighter from 'react-native-highlight-words';


const ContentShow = ({ params }) => {

    const wordsToSearch = [/\b\Fire\b/gi, /\b\Rain\b/gi, /\b\Forest\b/gi]

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
                    onPressHighlightedText={() => alert("start")}
                    onPressNormalText={() => alert("stop")}
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