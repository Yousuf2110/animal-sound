import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#61dafb',
  },
  innerContainer: {
    paddingHorizontal: wp(3),
    alignItems: 'center',
    marginVertical: hp(14),
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: hp(10),
  },
});
