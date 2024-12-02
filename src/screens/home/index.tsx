import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from './styles';
import {SCREEN} from '../../constants/screen';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Home</Text>
        <Button
          title="Press"
          onPress={() => navigation.navigate(SCREEN.GAME)}
        />
      </View>
    </View>
  );
};

export default Home;
