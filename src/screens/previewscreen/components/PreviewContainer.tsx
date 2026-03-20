import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ImageData } from '../../../store/types';
import { screenWidth } from '../../../constants/appConstants';
import { SnapbackZoom } from 'react-native-zoom-toolkit';
import Header from '../../../components/common/header/Header';
import { useAppNavigation } from '../../../hooks/useAppNavigation';

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
            width: screenWidth - 20,
            aspectRatio: imageData.aspectRatio.value,
            borderRadius: 12,
          }}
        />
      </SnapbackZoom>
    </View>
  );
};

export default PreviewContainer;

const styles = StyleSheet.create({});
