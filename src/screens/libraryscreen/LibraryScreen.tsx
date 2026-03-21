import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LibraryContainer from './components/container/LibraryContainer';

const LibraryScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <LibraryContainer />
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
