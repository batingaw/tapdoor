import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class InfoScreen extends React.Component {
    static navigationOptions = {
        title: 'Morse codes',
    }

    render() {
        return (
          <View style={styles.infoContainer}>
            <View>
                <Text style={styles.morseText}>A .-</Text> 
                <Text style={styles.morseText}>B -...</Text>
                <Text style={styles.morseText}>C -.-.</Text>
                <Text style={styles.morseText}>D -..</Text>
                <Text style={styles.morseText}>E .</Text>
                <Text style={styles.morseText}>F ..-.</Text>
                <Text style={styles.morseText}>G --.</Text>
                <Text style={styles.morseText}>H ....</Text>
                <Text style={styles.morseText}>I ..</Text>
                <Text style={styles.morseText}>J .---</Text>
                <Text style={styles.morseText}>K -.-</Text>
                <Text style={styles.morseText}>L .-..</Text>
                <Text style={styles.morseText}>M --</Text>
                <Text style={styles.morseText}>N -.</Text>
                <Text style={styles.morseText}>O ---</Text>
                <Text style={styles.morseText}>P .--.</Text>
                <Text style={styles.morseText}>Q --.-</Text>
                <Text style={styles.morseText}>R .-.</Text>
            </View>
            <View>
                <Text style={styles.morseText}>S ...</Text>
                <Text style={styles.morseText}>T -</Text>
                <Text style={styles.morseText}>U ..-</Text>
                <Text style={styles.morseText}>V ...-</Text>
                <Text style={styles.morseText}>W .--</Text>
                <Text style={styles.morseText}>X -..-</Text>
                <Text style={styles.morseText}>Y -.--</Text>
                <Text style={styles.morseText}>Z --..</Text>
                <Text style={styles.morseText}>0 -----</Text>
                <Text style={styles.morseText}>1 .----</Text>
                <Text style={styles.morseText}>2 ..---</Text>
                <Text style={styles.morseText}>3 ...--</Text>
                <Text style={styles.morseText}>4 ....-</Text>
                <Text style={styles.morseText}>5 .....</Text>
                <Text style={styles.morseText}>6 -....</Text>
                <Text style={styles.morseText}>7 --...</Text>
                <Text style={styles.morseText}>8 ---..</Text>
                <Text style={styles.morseText}>9 ----.</Text>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        paddingTop: 30
    },
    morseText: {
        fontWeight: 'bold',
        fontSize: 20
    }
  });