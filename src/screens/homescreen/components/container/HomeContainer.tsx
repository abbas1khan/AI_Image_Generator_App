import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../../../components/header/Header';
import PromptInput from '../promptinput/PromptInput';
import ImagePreview from '../imagepreview/ImagePreview';
import useHomeScreen from '../../hooks/useHomeScreen';
import { IDynamicBottomSheetRef } from '../../../../components/dynamicbottomsheet/DynamicBottomSheet';
import SettingsBottomSheet from '../settingsbottomsheet/SettingsBottomSheet';

const HomeContainer = () => {
  const { states, generateImage } = useHomeScreen();
  const settingsSheetRef = React.useRef<IDynamicBottomSheetRef>(null);

  const showSettingsSheet = useCallback(() => {
    settingsSheetRef.current?.showSheet();
  }, []);

  const handleImageLoad = useCallback(() => {
    states.setIsGenerating(false);
  }, [states]);

  const handleImageLoadError = useCallback(() => {
    states.setIsGenerating(false);
    states.setIsError(true);
  }, [states]);

  return (
    <View style={styles.container}>
      <Header
        label="AI IMAGE"
        title="GENERATOR"
        containerStyle={styles.header}
      />

      <View style={styles.container}>
        <View style={styles.imagePreviewContainer}>
          <ImagePreview
            imageData={states.generatedImageData}
            isGenerating={states.isGenerating}
            aspectRatio={states.aspectRatio.value}
            isError={states.isError}
            onImageLoad={handleImageLoad}
            onImageLoadError={handleImageLoadError}
          />
        </View>

        <PromptInput
          isGenerating={states.isGenerating}
          onSettingPress={showSettingsSheet}
          onGeneratePress={generateImage}
        />
      </View>

      <SettingsBottomSheet ref={settingsSheetRef} states={states} />
    </View>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft: 12,
  },
  imagePreviewContainer: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 16,
  },
});
