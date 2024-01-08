import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {collection, setDoc, doc} from 'firebase/firestore';
import {db} from './firebase/firebase';

export const onGoogleButtonPress = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth()
      .signInWithCredential(googleCredential)
      .then(res => {
        if (res?.additionalUserInfo?.isNewUser) {
          Alert.alert('New User!', 'Welcome to the app new user!!');

          const docRef = doc(collection(db, 'users'), res?.user?.uid);
          setDoc(docRef, {
            email: res?.additionalUserInfo?.profile?.email,
          });
        }
      });
  } catch (error) {
    Alert.alert('Alert', 'Cound not sign in!');
  }
};
