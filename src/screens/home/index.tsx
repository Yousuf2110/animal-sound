import React from 'react';
import {View, Image, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {SCREEN} from '../../constants/screen';
import Button from '../../components/button';

const Home = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
        <Button
          title="Play Now"
          onPress={() => navigation.navigate(SCREEN.GAME)}
        />
      </View>
    </View>
  );
};

export default Home;
