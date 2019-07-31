import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class ThankYouScreen extends React.Component {
    static navigationOptions = {
        title: 'Thank You',
        headerLeft: null
    }

    render() {
        return (
          <View style={styles.infoContainer}>
            <Text style={styles.thankYouText}>Thank you for playing Tap Door!</Text>
            <Text style={styles.thankYouText}>New doors will be coming soon!</Text>
            <Text style={styles.thankYouText}>Stay tuned!</Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
        paddingTop: 30
    },
    thankYouText: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    }
  });