import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../../../components/common/header/Header';
import PromptInput from '../promptinput/PromptInput';
import ImagePreview from '../imagepreview/ImagePreview';
import useHomeScreen from '../../hooks/useHomeScreen';
import { IDynamicBottomSheetRef } from '../../../../components/common/dynamicbottomsheet/DynamicBottomSheet';
import SettingsBottomSheet from '../settingsbottomsheet/SettingsBottomSheet';

const HomeContainer = () => {
  const { states, generateImage } = useHomeScreen();
  const settingsSheetRef = React.useRef<IDynamicBottomSheetRef>(null);

  const showSettingsSheet = useCallback(() => {
    settingsSheetRef.current?.showSheet();
  }, []);

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
