



[![made-with-VSCode](https://img.shields.io/badge/Made%20with-VSCode-1f425f.svg)](https://code.visualstudio.com/)
# Along With Me

<img src="./src/assets/images/homepage.png"
     alt="Log-in Page"
     height= '190'/>


## Description
Read along with me! Listen along with me! Adventure along with me! This audiobook companion app takes the text of your audiobook and lets you select specific words for background noise. Really transport yourself! When our application registers the word 'fire' click to hear a crackling fireplace. Set the specific sounds you want to hear and the volume in the settings.


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Links](#Links)
* [Tenchnologies](#Technologies)
* [Icebox](#Icebox)
* [Developers](#Developers)

## Installation
npm i and pod install for ios 

## Usage
This application is run with React-Native. To run this application locally with android, an android emulator with AndroidStudio needs to be installed. To run with ios, xcode must be installed.

Updates need to be made to react-native-highlight-words node module to update run this package as well;

In react-native-highlight-words index.js, copy and paste this code:


    import React from 'react';
    import { Text } from 'react-native';
    import { findAll } from 'highlight-words-core';
    import PropTypes from 'prop-types';
    Highlighter.propTypes = {
        autoEscape: PropTypes.bool,
        highlightStyle: Text.propTypes.style,
        searchWords: PropTypes.arrayOf(PropTypes.instanceOf(RegExp)).isRequired,
        textToHighlight: PropTypes.string.isRequired,
        sanitize: PropTypes.func,
        style: Text.propTypes.style,
        onPressNormalText: PropTypes.func,
        onPressHighlightedText: PropTypes.func
    };
    /**
    * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
    * This function returns an array of strings and <Text> elements (wrapping highlighted words).
    */
    export default function Highlighter({
        autoEscape,
        highlightStyle,
        searchWords,
        textToHighlight,
        sanitize,
        style,
        onPressNormalText,
        onPressHighlightedText,
        ...props
    }) {
        const chunks = findAll({ textToHighlight, searchWords, sanitize, autoEscape });
        return (
            <Text style={style} {...props}>
                {chunks.map((chunk, index) => {
                    const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
                    return (!chunk.highlight)
                        ? <Text
                            key={index}
                            onPress={onPressNormalText}
                        >
                            {text}
                        </Text>
                        : (
                            <Text
                                key={index}
                                onPress={onPressHighlightedText}
                                style={chunk.highlight && highlightStyle}
                            >
                                {text}
                            </Text>
                        );
                })}
            </Text>
        );
    }

Also to run this application, some lines must be commented out in Android/app/src/main/java/MainApplication.java:
* lines 37 - 41

You run this application in terminal or bash with npx react-native start. To start the android application run 'npm run android'.
To start the ios application run 'npm run ios'

## License
MIT

## Contributing
Contributors allowed, please reach out to admin if interested.

## Links
* GitHub repository URL: https://github.com/ThirdProjectDev/rnApp2021
* Available to download on the Google Play Store: https://play.google.com/store/apps/details?id=com.rnapp2021


## Technologies


### Languages 
* React-Native (Javascript), CSS

### FrameWorks
* Bootstrap, Express

### Dependencies

* react-native-sound
* firebase



## Icebox

* Ability to listen and then play the sound - voice to audio, not just text to audio



## Third Project Development Team

### Anna Conover
![anna Github Profile Picture](https://github.com/annaxgrace.png?size=200)

* Github username: annaxgrace
* Email: anna.grace.conover@gmail.com
* GitHub Profile URL: https://github.com/AnnaxGrace



### Vinne Lopez

<img src="./src/assets/images/vinnie.JPG"
     alt="Picture of Developer Vinnie"
     height= "200" />

* Github username: vinnielo
* Email: vinnielo01@gmail.com
* GitHub Profile URL: https://github.com/vinnielo



### Julia "Jace" Clements

![jace Github Profile Picture](https://github.com/tiiedye.png?size=200)

* Github username: tiiedye
* Email: tiiedye@gmail.com
* GitHub Profile URL: https://github.com/tiiedye


### Erik Hirsch

![eh4git Github Profile Picture](https://github.com/eh4git.png?size=200)

* Github username: eh4git
* Email: ehirsch760@gmail.com
* GitHub Profile URL: https://github.com/eh4git


## Third Project Development: https://tiiedye.github.io/ThirdProjectDev/
### Credits to ZapSplat for sounds


