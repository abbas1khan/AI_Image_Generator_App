import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { colors } from './src/constants/colors';

const App = () => {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar
              barStyle="light-content"
              backgroundColor={colors.backgroundAlt}
              translucent={true}
            />
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default App;
