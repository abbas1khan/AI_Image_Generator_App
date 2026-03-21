import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import React, { useCallback } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useImageStore } from '../../../../store/imageStore';
import { screenWidth } from '../../../../constants/appConstants';
import { ScreenNames } from '../../../../navigation/screennames';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';
import Header from '../../../../components/common/header/Header';
import { colors } from '../../../../constants/colors';

const LibraryContainer = () => {
  const [selectedImageIds, setSelectedImageIds] = React.useState<Set<string>>(
    new Set(),
  );

  const navigation = useAppNavigation();
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

  return (
    <View style={{ flex: 1 }}>
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
        masonry
        keyExtractor={(image) => image.id}
        renderItem={({ item, index }) => {
          const isSelected = selectedImageIds.has(item.id);
          return (
            <Pressable
              onPress={() => {
                if (selectedImageIds.size) {
                  toggleSelection(item.id);
                } else {
                  navigation.navigate(ScreenNames.PreviewScreen, {
                    imageData: item,
                  });
                }
              }}
              onLongPress={() => {
                toggleSelection(item.id);
              }}
              style={{
                width: screenWidth / 2 - 10,
                flex: 1,
                borderColor: colors.border,
                borderWidth: 1,
                marginVertical: 10,
              }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{ uri: item.imageUri }}
                  style={{
                    width: '100%',
                    aspectRatio: item.aspectRatio.value,
                    borderRadius: 6,
                  }}
                />
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    position: 'absolute',
                    backgroundColor: isSelected
                      ? colors.white
                      : colors.transparent,
                  }}
                />
              </View>

              <Text numberOfLines={2} style={{ color: 'white' }}>
                {item?.prompt}
              </Text>
              <Text style={{ color: 'white' }}>{item.id}</Text>
              {/* <Text style={{ color: 'white' }}>{item?.aspectRatio?.value}</Text>
            <Text style={{ color: 'white' }}>{item?.mimeType}</Text>
            <Text style={{ color: 'white' }}>{item?.modelData?.model}</Text> */}
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default LibraryContainer;

const styles = StyleSheet.create({});
