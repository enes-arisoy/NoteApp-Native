import React from 'react';
import StackNavigation from './src/navigators/StackNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StackNavigation />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
