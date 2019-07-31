import React from 'react';
import { StackNavigator } from 'react-navigation';
import GameScreen from './screens/GameScreen';
import SplashScreen from './screens/SplashScreen';
import InfoScreen from './screens/InfoScreen';
import ThankYouScreen from './screens/ThankYouScreen';

const TapDoor = StackNavigator({
    SplashRoute: { screen: SplashScreen },
    GameRoute: { screen: GameScreen },
    InfoRoute: { screen: InfoScreen },
    ThankYouRoute: { screen: ThankYouScreen }
});

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <TapDoor />;
  }
}
