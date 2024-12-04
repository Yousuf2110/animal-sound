import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

import {THEME} from '../../constants/theme';

export const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: hp(6.6),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: THEME.RED,
    shadowOffset: {
      width: 20,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: THEME.BACKGROUND,
    marginVertical: hp(3),
    flexDirection: 'row',
    paddingHorizontal: wp(2),
  },
  textColumn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: RFPercentage(2.3),
    color: THEME.WHITE,
    fontFamily: 'Poppins-Bold',
  },
});
