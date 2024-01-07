import React from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Typography from '../components/atoms/Typography';

const Home = () => {
  const signout = () => {
    Alert.alert('Notice', 'Are you sure to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          auth()
            .signOut()
            .then(() => console.log('User signed out!')),
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_container}>
        <Typography text="User Info" as={'heading'} />
        <TouchableOpacity>
          <Typography onPress={signout} text={'SignOut'} as={'danger'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: Platform.OS === 'ios' ? 64 : 32,
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
