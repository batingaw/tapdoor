import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

export default class Door extends React.Component {
    constructor(props) {
        super(props);
        this.doorImageOpen = require('../assets/door-gray-open.png');
    }

    render() {
        if(this.props.isClose) {
            return  <View style={styles.doorCloseContainer}> 
                        <Image source={this.props.imageSource} style={styles.doorImage} resizeMode={'cover'}>
                        </Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.questionText}>{this.props.question}</Text>
                            <Text style={[styles.userAnswerText, this.props.isCorrectAnswer ? styles.userCorrectAnswerText : styles.userWrongAnswerText]}>{this.props.userAnswer}</Text>
                        </View>
                    </View>
        } else {
            return <View> 
                        <Image source={this.doorImageOpen} style={styles.doorImage} resizeMode={'cover'}>
                        </Image>
                        <View style={styles.textContainer}>
                            <Text style={[styles.answerText]}>{this.props.answer}</Text>
                        </View>
                    </View>
        }
    }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    doorCloseContainer: {
        margin: 0,
        padding: 0
    },
    doorImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: win.height,
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerText: {
        fontSize: 70,
        color: 'green',
        fontWeight: 'bold'
    },
    userAnswerText: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50
    },
    userCorrectAnswerText: {
        color: 'green',
    },
    userWrongAnswerText: {
        color: 'red',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10
    }
});