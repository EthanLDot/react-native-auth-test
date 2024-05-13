import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator, Text, Alert } from "react-native";
import app from '../firebaseConfig'
import {getAuth, signOut, onAuthStateChanged} from 'firebase/auth'
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from "./rootstackparams";

type LoginNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Success'
>;

type Props = {
  navigation: LoginNavigationProp;
};


export function Success({navigation} : Props) {
    useEffect(() => {
        // This code will run after the component has mounted
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            
          } else {
            navigation.replace("Login");
          }
        });
    
        // You can perform any initialization tasks here
        return () => {
          // This code will run when the component is unmounted
          // You can perform cleanup tasks here
        };
      }, []); 
    
    const [userId, setUserId] = useState<string | null>(null);
    const handleLogout = () => {
        try {
          const auth = getAuth(app);
          signOut(auth);
          return;
        }
        catch(error) {
          Alert.alert('Failure', 'you are a failure');
    
        }
      };
    useEffect(() => {
        const getCurrentUserId = async () => {
          try {
            // Call your authentication library function to get the current user's ID
            const auth = getAuth(app);
            const currentUser = await auth.currentUser;
            if (currentUser) {
              setUserId(currentUser.uid);
            } else {
              setUserId(null);
            }
          } catch (error) {
            console.error('Error fetching user ID:', error);
            setUserId(null);
          }
        };
    
        getCurrentUserId();
      }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userId ? (
        <View>
            <Text>User ID: {userId}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}><Text>LOG OUT</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Login")}>
                <Text>Test Remember Me Functionality</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <Text>No user logged in</Text>
      )}
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