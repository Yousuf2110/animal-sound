import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {THEME} from '../../constants/theme';
import {RFPercentage} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.WHITE,
    justifyContent: 'center',
  },
  box: {
    width: '75%',
    alignSelf: 'center',
    backgroundColor: THEME.BACKGROUND,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    color: THEME.RED,
    fontSize: RFPercentage(20),
    fontFamily: 'Poppins-SemiBold',
    marginTop: hp(3),
  },
  text: {
    color: THEME.WHITE,
    fontSize: RFPercentage(3),
    fontFamily: 'Poppins-Bold',
    marginLeft: wp(4),
    alignSelf: 'flex-start',
  },
});
