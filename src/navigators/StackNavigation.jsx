import { View, Text } from 'react-native';
import React from 'react';

import HomeScreen from './../screens/HomeScreen';
import NoteScreen from './../screens/NoteScreen';
import UpdateScreen from './../screens/UpdateScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Note"
        component={NoteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update"
        component={UpdateScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
