import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { colors } from '../../../constants/colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ImageData } from '../../../store/types';

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
    <View style={[styles.container, { aspectRatio }]}>
      {imageData?.imageUri ? (
        <Image source={{ uri: imageData.imageUri }} style={styles.image} />
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
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 1,
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
