import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import AppInputField from '../components/molecules/AppInputField';
import Typography from '../components/atoms/Typography';
import {colors} from '../assets/colors';
import AppButton from '../components/molecules/AppButton';
import GoogleIcon from '../components/molecules/GoogleIcon';
import auth from '@react-native-firebase/auth';
import LoadingIndicator from '../components/molecules/LoadingIndicator';
import {onGoogleButtonPress} from '../utils';

const Signin = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      setLoading(true);
      const res = await auth().signInWithEmailAndPassword(email, password);

      if (res.additionalUserInfo.isNewUser)
        Alert.alert('New User!', 'Welcome to the app new user!!');
    } catch (error) {
      if (error?.code === 'auth/invalid-email') {
        Alert.alert('Error!', 'Wrong email or password!');
      } else if (error?.code === 'auth/invalid-credential') {
        Alert.alert('Error!', 'Invalid email or password!');
      } else Alert.alert('Error!', 'Could not sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'android' ? (
        <LoadingIndicator visible={loading} />
      ) : null}

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
        <AppInputField value={email} onChange={setEmail} placeholder="Email" />
        <AppInputField
          value={password}
          onChange={setPassword}
          placeholder="Password"
          secureText
        />

        <Typography
          style={{textAlign: 'right', color: colors.grey, marginBottom: 18}}
          text="Forgot Password?"
        />

        {/* SignIn button */}
        <AppButton
          disabled={email.length < 1 || password.length < 1}
          text={
            Platform.OS === 'android' ? (
              'Sign In'
            ) : loading ? (
              <ActivityIndicator color={'black'} size={'small'} />
            ) : (
              'Sign In'
            )
          }
          variant={'primary'}
          onPress={signIn}
        />

        <View style={styles.signup_text}>
          <Typography as={'body'} text="Don't have an account? " />
          <Typography
            as={'link'}
            text={'Sign Up'}
            onPress={() => navigation.navigate('Signup')}
          />
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

        <GoogleIcon onPress={onGoogleButtonPress} />
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
    marginBottom: Platform.OS === 'ios' ? 16 : 0,
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
});

export default Signin;
