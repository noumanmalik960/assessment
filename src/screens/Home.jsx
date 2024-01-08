import React, {useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Typography from '../components/atoms/Typography';
import {doc, deleteDoc, getDoc, setDoc, collection} from 'firebase/firestore';
import {db} from '../firebase/firebase';
import LoadingIndicator from '../components/molecules/LoadingIndicator';
import InputField from '../components/molecules/AppInputField';
import AppButton from '../components/molecules/AppButton';
import {colors} from '../assets/colors';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);

  const [orignalData, setOrignalData] = useState({});
  const [formValues, setFormValues] = useState({
    gender: '',
    age: '',
    country: '',
    city: '',
  });

  useEffect(() => {
    setLoading(true);

    let userId = auth().currentUser?.uid;
    const getData = async () => {
      //  Get a reference to the document
      const docRef = doc(db, 'users', userId);

      // Get the document
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormValues(docSnap.data());
        setOrignalData(docSnap.data());
      }
    };

    getData().then(() => setLoading(false));
  }, []);

  const handleInputChange = (field, value) => {
    setFormValues({...formValues, [field]: value});
  };

  const toggleSwitch = () => {
    setEditable(prevValue => !prevValue);
  };

  const signout = () => {
    Alert.alert('Notice', 'Are you sure to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => auth().signOut(),
      },
    ]);
  };

  const deleteUser = () => {
    let user = auth().currentUser;

    Alert.alert('Notice', 'Are you sure to delete user account?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          user
            .delete()
            .then(() => {
              console.log('User deleted');
            })
            .then(() => {
              // Get a reference to the document to be deleted
              const docRef = doc(db, 'users', user.uid);
              // Delete the document
              deleteDoc(docRef);
            })
            .catch(error => {
              if (error?.code === 'auth/requires-recent-login') {
                Alert.alert(
                  'Notice',
                  'This is a sensitive operation. Please sign out and log in again to perform account deletion!',
                );
              }
              console.log(error?.code);
            })
            .finally(() => {
              Alert.alert('Notice', 'Account deleted!');
            });
        },
      },
    ]);
  };

  const getDataToUpdate = () => {
    let data = {};
    if (orignalData.age !== formValues.age) {
      data.age = formValues.age;
    }
    if (orignalData.gender !== formValues.gender) {
      data.gender = formValues.gender;
    }
    if (orignalData.country !== formValues.country) {
      data.country = formValues.country;
    }
    if (orignalData.city !== formValues.city) {
      data.city = formValues.city;
    }

    return data;
  };

  const updateData = async () => {
    setLoading(true);
    let userId = auth().currentUser?.uid;
    const data = getDataToUpdate();

    const isEqual = JSON.stringify(orignalData) === JSON.stringify(formValues);

    try {
      if (isEqual) {
        Alert.alert('Notice', 'Change any field to update!');
      } else {
        const docRef = doc(collection(db, 'users'), userId);
        await setDoc(docRef, data, {merge: true});
        Alert.alert('Success', 'Data updated!');
      }
    } catch (error) {
      Alert.alert('Error', 'Error updating the data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' ? <LoadingIndicator visible={loading} /> : null}

      <View style={styles.header_container}>
        <Typography text="User Info" as={'heading'} />
        <TouchableOpacity>
          <Typography onPress={signout} text={'SignOut'} as={'danger'} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Switch
          style={{
            transform: [{scaleX: 0.6}, {scaleY: 0.6}],
          }}
          trackColor={{false: colors.black, true: colors.black}}
          onValueChange={toggleSwitch}
          value={editable}
        />
        <Typography
          text={editable ? 'Editable' : 'Not-editable'}
          as={'caption'}
        />
      </View>

      <InputField
        value={formValues.gender}
        onChange={value => handleInputChange('gender', value)}
        editable={editable}
        placeholder={'Gender'}
      />
      <InputField
        value={formValues.age}
        onChange={value => handleInputChange('age', value)}
        editable={editable}
        placeholder={'Age'}
      />
      <InputField
        value={formValues.country}
        onChange={value => handleInputChange('country', value)}
        editable={editable}
        placeholder={'Country'}
      />
      <InputField
        value={formValues.city}
        onChange={value => handleInputChange('city', value)}
        editable={editable}
        placeholder={'City'}
      />

      <AppButton text={'Save'} variant={'secondary'} onPress={updateData} />

      <TouchableOpacity style={{alignSelf: 'flex-end'}}>
        <Typography
          onPress={deleteUser}
          text={'Delete User'}
          as={'danger'}
          style={{textAlign: 'right'}}
        />
      </TouchableOpacity>
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
