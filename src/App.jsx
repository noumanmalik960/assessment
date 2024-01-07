import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AppNavigator from './navigation/AppNavigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
    });
  }, []);

  const [initializing, setInitializing] = useState(true);
  const [isAuthenticated, setisAuthenticated] = useState();

  // Handle user state changes
  const onAuthStateChanged = user => {
    setisAuthenticated(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return <AppNavigator user={isAuthenticated} />;
};

export default App;

// const isDarkMode = useColorScheme() === 'dark';

// const backgroundStyle = {
//   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// };
// <StatusBar
// barStyle={isDarkMode ? 'light-content' : 'dark-content'}
// backgroundColor={backgroundStyle.backgroundColor}
// />
