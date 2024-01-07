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
import LoadingIndicator from '../components/molecules/LoadingIndicator';
import Icon from 'react-native-vector-icons/AntDesign';
import GoogleIcon from '../components/molecules/GoogleIcon';
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    try {
      setLoading(true);
      const res = await auth().createUserWithEmailAndPassword(
        'nouman.javed@stackone.co',
        'SuperSecretPassword!',
      );

      console.log(res?.user?.email);

      if (res.additionalUserInfo.isNewUser)
        Alert.alert('New User!', 'Welcome to the app new user!!');
    } catch (error) {
      console.log(error);
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

      <View style={styles.signup_container}>
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
            text={`By creating account, you agree to our\nTerms and Conditions`}
            style={styles.terms_text}
          />
        </View>

        {/* SignIn button */}
        <AppButton
          text={
            Platform.OS === 'android' ? (
              'Sign Up'
            ) : loading ? (
              <ActivityIndicator color={'black'} size={'small'} />
            ) : (
              'Sign Up'
            )
          }
          variant={'primary'}
          onPress={signUp}
        />

        <View style={styles.signup_text}>
          <Typography as={'body'} text="Already have an account? " />
          <Typography
            as={'link'}
            text={'Sign In'}
            onPress={() => navigation.navigate('Signin')}
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
  signup_container: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginHorizontal: 10,
    padding: 18,
    marginBottom: Platform.OS === 'ios' ? 16 : 0,
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
    marginLeft: 12,
    marginBottom: 18,
    marginTop: 12,
    gap: 8,
  },
  terms_text: {
    fontStyle: 'italic',
  },
});

export default Signup;
