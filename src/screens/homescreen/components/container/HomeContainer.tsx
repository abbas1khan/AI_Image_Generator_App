import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../../../components/header/Header';
import PromptInput from '../promptinput/PromptInput';
import ImagePreview from '../imagepreview/ImagePreview';
import useHomeScreen from '../../hooks/useHomeScreen';
import { IDynamicBottomSheetRef } from '../../../../components/dynamicbottomsheet/DynamicBottomSheet';
import SettingsBottomSheet from '../settingsbottomsheet/SettingsBottomSheet';
import Toast, {
  ToastRef,
  ToastVariant,
} from '../../../../components/toast/Toast';
import { AxiosError } from 'axios';

const HomeContainer = () => {
  const settingsSheetRef = useRef<IDynamicBottomSheetRef>(null);
  const toastRef = useRef<ToastRef>(null);

  const { states, generateImage } = useHomeScreen({
    onError: handleError,
  });

  function handleError(error: AxiosError) {
    const data = error?.response?.data as { error?: { message?: string } };
    toastRef?.current?.show({
      variant: ToastVariant.Error,
      title: 'Generation failed',
      duration: 6000,
      zIndex: 0,
      description: data?.error?.message,
    });
  }

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

          <Toast ref={toastRef} />
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
