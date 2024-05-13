import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator, Text, Alert } from "react-native";
import app from '../firebaseConfig'
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthErrorCodes} from 'firebase/auth'
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from "./rootstackparams";

type LoginNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginNavigationProp;
};

export function Login({navigation} : Props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function registerAndLogin() {
    setLoading(true);
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      const response = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return;
    }
    catch(error) {
      setLoading(false);
      Alert.alert('Failure', error);

    }
  }
  async function LoginOnly() {
    setLoading(true);
    try {
      const auth = getAuth(app);
      const response = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return;
    }
    catch(error) {
      setLoading(false);
      Alert.alert('Failure', "" + error);

    }
  }
  useEffect(() => {
    // This code will run after the component has mounted
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Success');
      } else {
      }
    });

    // You can perform any initialization tasks here
    return () => {
      // This code will run when the component is unmounted
      // You can perform cleanup tasks here
    };
  }, []); 
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail}></TextInput>
      <TextInput style={[styles.input, {marginTop: 15}]} placeholder="Password" onChangeText = {setPassword}></TextInput>
      
      <TouchableOpacity style={styles.button} onPress={LoginOnly}>
        { loading ? (<ActivityIndicator
        size={'small'}
        color={'white'}
        animating={loading}
        />) : (<Text style={{color:'white'}}>Login</Text>)}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={registerAndLogin}>
        { loading ? (<ActivityIndicator
        size={'small'}
        color={'white'}
        animating={loading}
        />) : (<Text style={{color:'white'}}>Signup</Text>)}
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 45,
    borderRightColor: 'teal',
    borderRadius: 6,
    marginTop: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: { 
    width: '90%',
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 10, 
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
});