import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Typography from '../atoms/Typography';
import {colors} from '../../assets/colors';

const AppButton = ({text, variant, onPress, style, ...props}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      style={[styles.base, getButtonStyle(), style]}
      onPress={onPress}
      {...props}>
      <Typography
        style={{
          fontWeight: 'bold',
          color: variant === 'primary' ? colors.black : colors.white,
        }}
        text={text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    marginBottom: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.black,
  },
});

export default AppButton;
