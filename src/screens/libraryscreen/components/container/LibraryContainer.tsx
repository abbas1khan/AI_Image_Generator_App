import { StyleSheet, View, Button } from 'react-native';
import React, { useCallback } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useImageStore } from '../../../../store/imageStore';
import Header from '../../../../components/common/header/Header';
import ImageCard from '../imagecard/ImageCard';
import { ImageData } from '../../../../store/types';

const LibraryContainer = () => {
  const [selectedImageIds, setSelectedImageIds] = React.useState<Set<string>>(
    new Set(),
  );

  const images = useImageStore((state) => state.images);
  const deleteMultipleImages = useImageStore(
    (state) => state.deleteMultipleImages,
  );

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
      <Header
        label="YOUR"
        title="LIBRARY"
        containerStyle={{ marginLeft: 16 }}
      />

      <Button
        title="Delete"
        onPress={() => {
          if (!selectedImageIds.size) return;
          deleteMultipleImages(Array.from(selectedImageIds));
          setSelectedImageIds(new Set());
        }}
      />

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
});
