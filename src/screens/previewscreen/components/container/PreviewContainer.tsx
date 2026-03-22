import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ImageData } from '../../../../store/types';
import { SnapbackZoom } from 'react-native-zoom-toolkit';
import Header from '../../../../components/common/header/Header';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';
import { screenWidth, windowHeight } from '../../../../constants/appConstants';

interface PreviewContainerProps {
  imageData: ImageData;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({ imageData }) => {
  const navigation = useAppNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Header
        label="IMAGE"
        title="PREVIEW"
        containerStyle={{ marginLeft: 16 }}
      />

      <SnapbackZoom>
        <Image
          source={{ uri: imageData.imageUri }}
          style={{
            width: screenWidth,
            maxHeight: windowHeight * 0.65,
            aspectRatio: imageData.aspectRatio.value,
            alignSelf: 'center',
          }}
        />
      </SnapbackZoom>
    </View>
  );
};

export default PreviewContainer;

const styles = StyleSheet.create({});
