import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {THEME} from '../../constants/theme';
import {RFPercentage} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2980b9',
  },
  header: {
    marginTop: hp(2),
  },
  scoreText: {
    fontSize: RFPercentage(5),
    fontWeight: 'bold',
    color: THEME.WHITE,
  },
  grid: {
    width: '90%',
    height: hp(55),
    backgroundColor: THEME.WHITE,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  snake: {
    backgroundColor: THEME.BACKGROUND,
    position: 'absolute',
    borderRadius: 4,
  },
  food: {
    backgroundColor: THEME.RED,
    position: 'absolute',
    borderRadius: wp(2.5),
  },
  controls: {
    marginBottom: hp(2),
    alignItems: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  controlButton: {
    padding: wp(3),
    borderRadius: 200 / 2,
    marginHorizontal: wp(6),
  },
  upButton: {
    backgroundColor: '#007aff',
  },
  downButton: {
    backgroundColor: '#ff3b30',
  },
  leftButton: {
    backgroundColor: '#4cd964',
  },
  rightButton: {
    backgroundColor: '#ff9500',
  },
});
