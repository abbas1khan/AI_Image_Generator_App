import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import PreviewScreen from '../screens/previewscreen/PreviewScreen';
import { ImageData } from '../store/types';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';
import { ScreenNames } from './screennames';

export type RootNavigatorParamList = {
  [ScreenNames.BottomTab]: undefined;
  [ScreenNames.PreviewScreen]: {
    imageData: ImageData;
  };
};

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={ScreenNames.BottomTab}
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name={ScreenNames.PreviewScreen}
          component={PreviewScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
