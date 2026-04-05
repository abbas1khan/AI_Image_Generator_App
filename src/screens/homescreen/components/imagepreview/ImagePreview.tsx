import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { colors } from '../../../../constants/colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ImageData } from '../../../../store/types';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';
import { ScreenNames } from '../../../../navigation/screennames';
import FastImage from '@d11/react-native-fast-image';
import { fontFamily } from '../../../../constants/layout';
import LottieView from 'lottie-react-native';

interface ImagePreviewProps {
  imageData: ImageData | null;
  aspectRatio: number;
  isGenerating: boolean;
  isError: boolean;
  onImageLoad: () => void;
  onImageLoadError: () => void;
}

const ImagePreview: FC<ImagePreviewProps> = ({
  imageData,
  aspectRatio,
  isGenerating,
  isError,
  onImageLoad,
  onImageLoadError,
}) => {
  const navigation = useAppNavigation();

  const handleImagePress = () => {
    if (isGenerating || !imageData?.imageUri || isError) return;

    navigation.navigate(ScreenNames.PreviewScreen, {
      imageData,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.previewSlot,
          { aspectRatio: imageData?.aspectRatio?.value || aspectRatio },
        ]}
      >
        <View style={styles.generationContainer}>
          {isGenerating ? (
            <View style={styles.generatingShell}>
              <SkeletonPlaceholder
                backgroundColor={colors.sheetBackground}
                highlightColor={colors.primaryLight}
              >
                <SkeletonPlaceholder.Item width="100%" height="100%" />
              </SkeletonPlaceholder>

              <View style={styles.generatingContentOverlay}>
                <LottieView
                  source={require('../../../../../assets/lottie/thunder.json')}
                  autoPlay
                  loop
                  style={styles.generatingThunderLottie}
                />

                <View style={styles.generatingMessageBlock}>
                  <Text style={styles.generatingTitle}>
                    Generating image...
                  </Text>

                  <Text style={styles.generatingSubtitle}>
                    This may take a few seconds
                  </Text>

                  <LottieView
                    source={require('../../../../../assets/lottie/dotWave.json')}
                    autoPlay
                    loop
                    style={styles.generatingDotWaveLottie}
                  />
                </View>
              </View>
            </View>
          ) : isError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to generate image</Text>
            </View>
          ) : null}
        </View>

        {imageData?.imageUri ? (
          <Pressable style={styles.imagePressable} onPress={handleImagePress}>
            <FastImage
              source={{
                uri: imageData?.imageUri,
                priority: FastImage.priority.high,
              }}
              onLoad={onImageLoad}
              onError={onImageLoadError}
              style={styles.image}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default React.memo(ImagePreview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatingShell: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  generatingContentOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  generatingThunderLottie: {
    width: '100%',
    height: '80%',
    marginTop: -20,
  },
  generatingMessageBlock: {
    alignSelf: 'center',
    marginTop: -30,
  },
  generatingTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.textSecondary,
    alignSelf: 'center',
  },
  generatingSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textMuted,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  generatingDotWaveLottie: {
    height: 10,
    aspectRatio: 3.5,
    alignSelf: 'center',
  },
  previewSlot: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 12,
  },
  imagePressable: {
    ...StyleSheet.absoluteFill,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  generationContainer: {
    ...StyleSheet.absoluteFill,
    borderRadius: 12,
    backgroundColor: colors.sheetBackground,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderElevated,
  },
  errorContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  errorText: {
    color: colors.textSecondary,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    textAlign: 'center',
  },
});
