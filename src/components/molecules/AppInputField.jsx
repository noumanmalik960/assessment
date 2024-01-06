import {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../assets/colors';

const InputField = ({placeholder, secureText = false}) => {
  const [showText, setShowText] = useState(secureText);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inp}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        secureTextEntry={showText}
      />
      {secureText ? (
        <Icon
          onPress={() => setShowText(prevState => !prevState)}
          name={!showText ? 'eye' : 'eye-off'}
          size={18}
          style={styles.inp_icon}
          color={colors.grey}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inp: {
    flex: 1,
    borderRadius: 12,
    borderColor: colors.lightgrey,
    borderWidth: 0.6,
    marginBottom: 8,
    padding: 12,
  },
  inp_icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
  },
});

export default InputField;
