import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SplashScreen extends React.Component {
    componentDidMount() {
        const { navigate } = this.props.navigation;
      
        setTimeout(()=>{
           navigate("GameRoute");
        }, 1000)
    }
    
    render() {
      return (
        <View style={styles.splashContainer}>
            <View style={styles.companyContainer}>
                <Text style={styles.company1}>
                    batingaw
                </Text>
                <Text style={styles.company2}>
                    LABS
                </Text>
            </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    companyContainer: {
        flex: 1,
        flexDirection:"row",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    company1: {
      color: "#008080",
      fontWeight: 'bold',
      fontSize: 40,
      height: 200,
    },
    company2: {
        color: "#00CED1",
        fontWeight: 'bold',
        fontSize: 32,
        height: 200,
        marginTop:12
      }
  });
  