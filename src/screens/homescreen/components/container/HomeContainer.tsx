import { StyleSheet, View } from 'react-native';
import React from 'react';
import Header from '../../../../components/common/header/Header';
import PromptInput from '../promptinput/PromptInput';
import ImagePreview from '../imagepreview/ImagePreview';
import useHomeScreen from '../../hooks/useHomeScreen';
import { GoogleGenAI } from '@google/genai';
import { GOOGLE_API_KEY } from '@env';
import { IDynamicBottomSheetRef } from '../../../../components/common/dynamicbottomsheet/DynamicBottomSheet';
import SettingsBottomSheet from '../settingsbottomsheet/SettingsBottomSheet';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const API_KEY = GOOGLE_API_KEY;
const googleAI = new GoogleGenAI({ apiKey: API_KEY });

const HomeContainer = () => {
  const { states, generateImage } = useHomeScreen({ googleAI });
  const settingsSheetRef = React.useRef<IDynamicBottomSheetRef>(null);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <Header
          label="AI IMAGE"
          title="GENERATOR"
          containerStyle={styles.header}
        />

        <View style={styles.imagePreviewParentContainer}>
          <View style={styles.imagePreviewContainer}>
            <ImagePreview
              imageData={states.generatedImageData}
              isGenerating={states.isGenerating}
              aspectRatio={states.aspectRatio.value}
            />
          </View>
        </View>

        <PromptInput
          isGenerating={states.isGenerating}
          onSettingPress={() => settingsSheetRef.current?.showSheet()}
          onGeneratePress={generateImage}
        />

        <SettingsBottomSheet ref={settingsSheetRef} states={states} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    marginLeft: 12,
  },
  imagePreviewParentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 215,
  },
  imagePreviewContainer: {
    height: '100%',
  },
});
