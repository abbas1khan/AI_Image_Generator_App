import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { colors } from '../../../../constants/colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ImageData } from '../../../../store/types';

interface ImagePreviewProps {
  imageData: ImageData | null;
  aspectRatio: number;
  isGenerating: boolean;
}

const ImagePreview: FC<ImagePreviewProps> = ({
  imageData,
  aspectRatio,
  isGenerating,
}) => {
  return (
    <View style={[styles.container]}>
      {imageData?.imageUri ? (
        <Image
          source={{ uri: imageData.imageUri }}
          style={[styles.image, { aspectRatio: imageData.aspectRatio.value }]}
        />
      ) : null}

      {isGenerating ? (
        <View style={styles.generationContainer}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    maxHeight: '100%',
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 12,
  },
  generationContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
