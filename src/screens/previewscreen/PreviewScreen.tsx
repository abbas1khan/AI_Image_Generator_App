import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PreviewContainer from './components/container/PreviewContainer';
import { colors } from '../../constants/colors';
import { ScreenNames } from '../../navigation/screennames';
import { useAppRoute } from '../../hooks/useAppRoute';

const PreviewScreen = () => {
  const route = useAppRoute<ScreenNames.PreviewScreen>();
  const { top } = useSafeAreaInsets();
  const imageData = route.params?.imageData;

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <PreviewContainer imageData={imageData} />
    </View>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
