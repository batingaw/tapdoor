import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import Door from './Door';
import { MorseService } from '../services/morse-service';
import { QuizService } from '../services/quiz-service';

import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';
          
const Sound = require('react-native-sound');
Sound.setCategory('Playback');

export default class GameScreen extends React.Component {
    constructor(props) {
        super(props);
        this.doorImages = [
            require('../assets/door-gray-close.png'),
            require('../assets/door-gray-open-1.png'),
            require('../assets/door-gray-open-2.png'),
            require('../assets/door-gray-open-3.png'),
        ];
        this.morseService = new MorseService();
        this.quizService = new QuizService();
        
        this.state = {
            doorImageIndex: 0,
            isDoorClose: true,
            question: '',
            answer: '',
            quizNo: "0"
        };  

        this.showAdCounter = 1;
        
        this.sound = new Sound('../assets/beep.wav', Sound.MAIN_BUNDLE, (e) => {
            if (e) {
              console.log('error', e)
            }
            else {
              this.sound.setSpeed(1);
            }
        });
    }

    componentDidMount() {
        this.closeDoor();
        this.initAd();
    }

    componentWillUnmount() {
        AdMobInterstitial.removeAllListeners();
      }

    initAd = ()=> {
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.setAdUnitID('ca-app-pub-9959650905583486/3927286891');
        //AdMobInterstitial.setAdUnitID('/6499/example/interstitial');
    
        AdMobInterstitial.addEventListener('adLoaded',
          () => console.log('AdMobInterstitial adLoaded')
        );
        AdMobInterstitial.addEventListener('adFailedToLoad',
          (error) => console.warn(error)
        );
        AdMobInterstitial.addEventListener('adOpened',
          () => console.log('AdMobInterstitial => adOpened')
        );
        AdMobInterstitial.addEventListener('adClosed',
          () => {
            console.log('AdMobInterstitial => adClosed');
            this.closeDoor();
            AdMobInterstitial.requestAd().catch(error => console.warn(error));
          }
        );
        AdMobInterstitial.addEventListener('adLeftApplication',
          () => console.log('AdMobInterstitial => adLeftApplication')
        );
    
        AdMobInterstitial.requestAd().catch(error => console.warn(error));
      }
  

    openDoor = () => {
        if(this.state.doorImageIndex<4){
            setTimeout(() => {
                this.setState({doorImageIndex: (this.state.doorImageIndex+1)});
                this.openDoor();
            }, 600);
        } else {
            this.setState({
                isDoorClose: false
            });   
        }
    }

    closeDoor = () => {
        //debugger;
        this.setState({
            doorImageIndex: 0,
            isDoorClose: true,
            question: '',
            answer: '',
            quizNo: "0"
        });   
        this.quizService.getNextQuiz((quiz) => {
            if(quiz) {
                this.setState({
                    question: quiz.question,
                    answer: quiz.answer,
                    quizNo: quiz.no
                }); 
            }
            else{
                const { navigate } = this.props.navigation;
                navigate("ThankYouRoute");
            }

        });
    }

    onResponderGrant = () => {
        this.sound.play(() => this.sound.release());
        //debugger;
        this.morseService.startMorseRecognition();
    }

    onResponderRelease = () => {
        this.sound.stop();
        
        this.morseService.stopMorseRecognition((decodedAnswer) => {
            if(this.state.isDoorClose) {
                this.setState({
                    userAnswer: decodedAnswer,
                });
                if(this.state.answer == decodedAnswer){
                    this.quizService.recordNextQuiz(this.state.quizNo);
                    this.setState({
                        isCorrectAnswer: true
                    });
                    setTimeout(()=>{
                        this.setState({
                            question: '',
                            userAnswer: ''
                        });
                        this.openDoor();
                    }, 500)
                } else {
                    this.setState({
                        isCorrectAnswer: false
                    });
                    setTimeout(()=>{
                        this.setState({
                            userAnswer: ''
                        });
                    }, 1600)
                }
            } else {
                //debugger;
                if(this.showAdCounter >= 3){
                    this.showAdCounter = 1;
                    AdMobInterstitial.showAd().catch(error => console.warn(error));
                } else {
                    this.showAdCounter = this.showAdCounter + 1;
                    this.closeDoor();
                }
            }
        });
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Tap the door to open',
        headerLeft: null,
        headerRight: (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity 
                onPress={ (x) => navigation.navigate('InfoRoute')}>
                <Image
                    style={styles.icon}
                    source={require('../assets/info.png')}
                />
              </TouchableOpacity>
            </View>
          )
    });

    renderAdBanner = () => {
       return (
                <View>
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-9959650905583486/6915524266"
                        testDevices={[AdMobBanner.simulatorId]}
                        onAdFailedToLoad={error => console.error(error)}
                    />
                </View>
            );
    }

    render() {
      return (
        <View style={styles.gameContainer}
            onStartShouldSetResponder={() => true}
            onResponderGrant={this.onResponderGrant}
            onResponderRelease={this.onResponderRelease}
        >
            <View style={styles.doorContainer}>
                <Door 
                    imageSource={this.doorImages[this.state.doorImageIndex]} 
                    isClose={this.state.isDoorClose}
                    question={this.state.question} 
                    answer={this.state.answer}
                    userAnswer={this.state.userAnswer} 
                    isCorrectAnswer={this.state.isCorrectAnswer}/>
            </View>
            {this.renderAdBanner()}
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    gameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    },
    doorContainer: {
        flex: 1,
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    headerRightContainer: {
        marginRight:10
    },
    icon: {
        width: 30,
        height: 30
    }
  });