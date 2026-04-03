import { StyleSheet, View, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import type { FlashListRef } from '@shopify/flash-list';
import { useImageStore } from '../../../../store/imageStore';
import Header from '../../../../components/header/Header';
import ImageCard from '../imagecard/ImageCard';
import { ImageData } from '../../../../store/types';
import { isAndroid } from '../../../../constants/appConstants';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';

const LibraryContainer = () => {
  const [selectedImageIds, setSelectedImageIds] = React.useState<Set<string>>(
    new Set(),
  );

  const listRef = useRef<FlashListRef<ImageData>>(null);
  useScrollToTop(listRef);

  const navigation = useAppNavigation();
  const images = useImageStore((state) => state.images);
  const deleteMultipleImages = useImageStore(
    (state) => state.deleteMultipleImages,
  );

  useEffect(() => {
    if (!(isAndroid && selectedImageIds.size > 0)) return;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setSelectedImageIds(new Set());
        return true;
      },
    );

    return () => backHandler.remove();
  }, [selectedImageIds]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (selectedImageIds.size > 0) {
        // deleteMultipleImages(Array.from(selectedImageIds));
        setSelectedImageIds(new Set());
      }
    });

    return unsubscribe;
  }, [navigation, selectedImageIds]);

  const toggleSelection = useCallback((id: string, isTap = false) => {
    let shouldNavigate = false;

    setSelectedImageIds((prev) => {
      const isSelectionMode = prev.size > 0;

      // If it's a tap and NOT in selection mode → navigate
      if (isTap && !isSelectionMode) {
        shouldNavigate = true;
        return prev;
      }

      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });

    return shouldNavigate;
  }, []);

  const renderImageCard = useCallback(
    ({ item, index }: { item: ImageData; index: number }) => {
      return (
        <ImageCard
          imageData={item}
          isSelected={selectedImageIds.has(item.id)}
          toggleSelection={toggleSelection}
        />
      );
    },
    [selectedImageIds, toggleSelection],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header label="YOUR" title="LIBRARY" containerStyle={styles.header} />
      </View>

      <FlashList
        ref={listRef}
        data={images}
        numColumns={2}
        masonry={true}
        drawDistance={100000000}
        keyExtractor={(image) => image.id}
        renderItem={renderImageCard}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LibraryContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 80,
  },
  header: {
    marginLeft: 12,
  },
});
