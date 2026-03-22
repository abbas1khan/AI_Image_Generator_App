import { StyleSheet, View, Button, BackHandler } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useImageStore } from '../../../../store/imageStore';
import Header from '../../../../components/common/header/Header';
import ImageCard from '../imagecard/ImageCard';
import { ImageData } from '../../../../store/types';
import { isAndroid } from '../../../../constants/appConstants';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';

const LibraryContainer = () => {
  const [selectedImageIds, setSelectedImageIds] = React.useState<Set<string>>(
    new Set(),
  );

  const navigation = useAppNavigation();
  const images = useImageStore((state) => state.images);
  const deleteMultipleImages = useImageStore(
    (state) => state.deleteMultipleImages,
  );

  useEffect(() => {
    if (isAndroid && selectedImageIds.size > 0) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setSelectedImageIds(new Set());
          return true;
        },
      );

      return () => backHandler.remove();
    }
  }, [selectedImageIds]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (selectedImageIds.size > 0) {
        setSelectedImageIds(new Set());
      }
    });

    return unsubscribe;
  }, [navigation, selectedImageIds]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedImageIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const renderImageCard = ({
    item,
    index,
  }: {
    item: ImageData;
    index: number;
  }) => {
    return (
      <ImageCard
        imageData={item}
        isSelected={selectedImageIds.has(item.id)}
        selectedImageIdsSize={selectedImageIds.size}
        toggleSelection={toggleSelection}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header label="YOUR" title="LIBRARY" containerStyle={styles.header} />

      <FlashList
        data={images}
        numColumns={2}
        masonry={true}
        drawDistance={500}
        keyExtractor={(image) => image.id}
        renderItem={renderImageCard}
      />
    </View>
  );
};

export default LibraryContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft: 12,
  },
});
