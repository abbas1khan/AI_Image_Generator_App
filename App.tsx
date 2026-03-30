import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { colors } from './src/constants/colors';
import { PortalHost, PortalProvider } from '@gorhom/portal';

const App = () => {
  return (
    <GestureHandlerRootView>
      <PortalProvider>
        <KeyboardProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar
                barStyle="light-content"
                backgroundColor={colors.backgroundAlt}
                translucent={true}
              />
              <RootNavigator />
              <PortalHost name="settingsBottomSheet" />
            </NavigationContainer>
          </SafeAreaProvider>
        </KeyboardProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
