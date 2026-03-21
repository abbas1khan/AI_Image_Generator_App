import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeContainer from './components/container/HomeContainer';

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <HomeContainer />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
