import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';
import { screenWidth } from '../../../../constants/appConstants';
import { ScreenNames } from '../../../../navigation/screennames';
import { ImageData } from '../../../../store/types';
import { colors } from '../../../../constants/colors';
import Check from '../../../../../assets/svgs/check';
import FastImage from '@d11/react-native-fast-image';

interface ImageCardProps {
  imageData: ImageData;
  isSelected: boolean;
  toggleSelection: (id: string, isTap?: boolean) => boolean;
}

const ImageCard = ({
  imageData,
  isSelected,
  toggleSelection,
}: ImageCardProps) => {
  const navigation = useAppNavigation();

  const handlePress = () => {
    const shouldNavigate = toggleSelection(imageData.id, true);

    // If selection mode is not active, navigate to preview
    if (shouldNavigate) {
      navigation.navigate(ScreenNames.PreviewScreen, {
        imageData: imageData,
      });
    }
  };

  const handleLongPress = () => {
    toggleSelection(imageData.id);
  };

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={styles.container}
    >
      <View
        style={[
          styles.imageContainer,
          isSelected && styles.selectedImageContainer,
        ]}
      >
        <FastImage
          source={{ uri: imageData.imageUri }}
          style={[
            styles.image,
            isSelected && styles.selectedImage,
            { aspectRatio: imageData.aspectRatio.value },
          ]}
        />

        {isSelected ? (
          <View style={styles.selectionIndicator}>
            <Check size={10} color={colors.white} />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

export default React.memo(ImageCard, (prevProps, nextProps) => {
  return (
    prevProps.imageData.id === nextProps.imageData.id &&
    prevProps.isSelected === nextProps.isSelected
  );
});

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2,
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  imageContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImageContainer: {
    borderColor: colors.primary,
  },
  image: {
    width: '100%',
    borderRadius: 6,
  },
  selectedImage: {
    borderRadius: 5,
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 0.6,
    borderColor: colors.textInput,
    top: 5,
    right: 5,
  },
});
