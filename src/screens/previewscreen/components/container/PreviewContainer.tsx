import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ImageData } from '../../../../store/types';
import { SnapbackZoom } from 'react-native-zoom-toolkit';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';
import { screenWidth, windowHeight } from '../../../../constants/appConstants';
import { colors } from '../../../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from '@d11/react-native-fast-image';

interface PreviewContainerProps {
  imageData: ImageData;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({ imageData }) => {
  const navigation = useAppNavigation();

  return (
    <ScrollView
      bounces={false}
      bouncesZoom={false}
      nestedScrollEnabled
      overScrollMode="never"
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      pinchGestureEnabled
      contentContainerStyle={styles.scrollContentContainer}
    >
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <SnapbackZoom>
        <FastImage
          source={{ uri: imageData.imageUri }}
          style={{
            width: screenWidth,
            maxHeight: windowHeight * 0.65,
            aspectRatio: imageData.aspectRatio.value,
            alignSelf: 'center',
          }}
        />
      </SnapbackZoom>

      <Text style={{ color: colors.textPrimary }}>{imageData.prompt}</Text>
    </ScrollView>
  );
};

export default PreviewContainer;

const styles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
});
