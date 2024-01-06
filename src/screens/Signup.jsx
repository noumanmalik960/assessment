import {Alert, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import AppInputField from '../components/molecules/AppInputField';
import Typography from '../components/atoms/Typography';
import {colors} from '../assets/colors';
import AppButton from '../components/molecules/AppButton';
import Icon from 'react-native-vector-icons/AntDesign';

const Signup = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title_container}>
        <Image
          source={require('../assets/images/app-icon.png')}
          style={{width: 50, height: 50}}
        />
        <Typography as={'title'} text={'Hola!'} />
      </View>

      <View style={styles.login_container}>
        <Typography as={'heading'} text={'Welcome Back'} />
        <Typography
          as={'subheading'}
          text={'Please log in to your account'}
          style={{marginBottom: 24}}
        />
        <AppInputField placeholder="Email" />
        <AppInputField placeholder="Password" secureText />

        <Typography
          style={{textAlign: 'right', color: colors.grey, marginBottom: 18}}
          text="Forgot Password?"
        />

        {/* SignIn button */}
        <AppButton
          text={'Sign In'}
          variant={'primary'}
          onPress={() => Alert.alert('hello')}
        />

        <View style={styles.signup_text}>
          <Typography as={'body'} text="Don't have an account? " />
          <Typography as={'link'} text={'Sign Up'} />
        </View>

        <View style={styles.line_container}>
          <View style={styles.line} />

          <Typography
            as={'caption'}
            text={'Or continue with'}
            style={{marginHorizontal: 8}}
          />

          <View style={styles.line} />
        </View>

        {/* Google icon */}
        <Icon
          name={'google'}
          size={18}
          color={colors.white}
          style={styles.google_icon}
          onPress={() => Alert.alert('Notice', 'google sign in')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingBottom: 22,
  },
  title_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  login_container: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginHorizontal: 10,
    padding: 18,
  },
  line_container: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginVertical: 18,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightgrey,
  },
  google_icon: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: colors.red,
    borderRadius: 12,
    overflow: 'hidden',
  },
  signup_text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
});

export default Signup;
