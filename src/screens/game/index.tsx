import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

const Game = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Game</Text>
      </View>
    </View>
  );
};

export default Game;
