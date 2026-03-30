import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { colors } from '../../../../constants/colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ImageData } from '../../../../store/types';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';
import { ScreenNames } from '../../../../navigation/screennames';
import FastImage from '@d11/react-native-fast-image';

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
  const navigation = useAppNavigation();

  const handleImagePress = () => {
    if (!imageData) return;

    navigation.navigate(ScreenNames.PreviewScreen, {
      imageData,
    });
  };

  return (
    <View style={styles.container}>
      {imageData?.imageUri ? (
        <Pressable onPress={handleImagePress}>
          <FastImage
            source={{
              uri: imageData.imageUri,
              priority: FastImage.priority.high,
            }}
            style={[styles.image, { aspectRatio: imageData.aspectRatio.value }]}
          />
        </Pressable>
      ) : (
        <View style={[styles.generationContainer, { aspectRatio }]}>
          {isGenerating ? (
            <View style={{ overflow: 'hidden' }}>
              <SkeletonPlaceholder
                backgroundColor={colors.sheetBackground}
                highlightColor={colors.primaryDim}
              >
                <SkeletonPlaceholder.Item width="100%" height="100%" />
              </SkeletonPlaceholder>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    height: '100%',
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
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: colors.borderElevated,
    backgroundColor: colors.sheetBackground,
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
