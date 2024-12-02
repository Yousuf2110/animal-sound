import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView} from 'react-native';
import {styles} from './styles';
import {SCREEN} from '../../constants/screen';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation: any = useNavigation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      navigation.navigate(SCREEN.HOME);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!visible) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Splash</Text>
    </SafeAreaView>
  );
};

export default Splash;
