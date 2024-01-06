import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../../assets/colors';

const GoogleIcon = ({onPress}) => {
  return (
    <Icon
      name={'google'}
      size={22}
      color={colors.white}
      style={styles.google_icon}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  google_icon: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.red,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default GoogleIcon;
