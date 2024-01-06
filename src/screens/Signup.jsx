import {Alert, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import AppInputField from '../components/molecules/AppInputField';
import Typography from '../components/atoms/Typography';
import {colors} from '../assets/colors';
import AppButton from '../components/molecules/AppButton';
import Icon from 'react-native-vector-icons/AntDesign';
import GoogleIcon from '../components/molecules/GoogleIcon';

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
        <Typography as={'heading'} text={'Register new account'} />
        <Typography
          as={'subheading'}
          text={'Please create a new account'}
          style={{marginBottom: 24}}
        />
        <AppInputField placeholder="Email" />
        <AppInputField placeholder="Password" secureText />

        <View style={styles.terms_container}>
          <Icon name={'checksquare'} size={24} color={colors.green} />
          <Typography
            as={'caption'}
            text={`By creating account, you agree to our Terms and Conditions`}
            style={styles.terms_text}
          />
        </View>

        {/* SignIn button */}
        <AppButton
          text={'Sign Up'}
          variant={'primary'}
          onPress={() => Alert.alert('hello')}
        />

        <View style={styles.signup_text}>
          <Typography as={'body'} text="Already have an account? " />
          <Typography as={'link'} text={'Sign In'} />
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

        <GoogleIcon />
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
  signup_text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  terms_container: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 18,
    marginTop: 12,
    gap: 8,
  },
  terms_text: {
    fontStyle: 'italic',
  },
});

export default Signup;
