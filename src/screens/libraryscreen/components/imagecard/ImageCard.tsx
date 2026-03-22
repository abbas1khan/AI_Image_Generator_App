import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';
import { screenWidth } from '../../../../constants/appConstants';
import { ScreenNames } from '../../../../navigation/screennames';
import { ImageData } from '../../../../store/types';

interface ImageCardProps {
  imageData: ImageData;
  isSelected: boolean;
  selectedImageIdsSize: number;
  toggleSelection: (id: string) => void;
}

const ImageCard = ({
  imageData,
  isSelected,
  selectedImageIdsSize,
  toggleSelection,
}: ImageCardProps) => {
  const navigation = useAppNavigation();

  const handlePress = () => {
    if (selectedImageIdsSize > 0) {
      toggleSelection(imageData.id);
    } else {
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
      <Image
        source={{ uri: imageData.imageUri }}
        style={[styles.image, { aspectRatio: imageData.aspectRatio.value }]}
      />
    </Pressable>
  );
};

export default React.memo(ImageCard);

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    borderRadius: 6,
  },
});
