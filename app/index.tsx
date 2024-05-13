import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login} from './login'; // Assuming UserProfilePage.tsx is in the same directory
import {Success} from './success';
import { RootStackParamList } from './rootstackparams';


const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

export default App;