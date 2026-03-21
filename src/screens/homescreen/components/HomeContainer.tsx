import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Header from '../../../components/common/header/Header';
import PromptInput from './PromptInput';
import ImagePreview from './ImagePreview';
import useHomeScreen from '../hooks/useHomeScreen';
import { GoogleGenAI } from '@google/genai';
import { GOOGLE_API_KEY } from '@env';
import DynamicBottomSheet, {
  IDynamicBottomSheetRef,
} from '../../../components/common/dynamicbottomsheet/DynamicBottomSheet';

const API_KEY = GOOGLE_API_KEY;
const googleAI = new GoogleGenAI({ apiKey: API_KEY });

const HomeContainer = () => {
  const { states, generateImage } = useHomeScreen({ googleAI });
  const settingsSheetRef = React.useRef<IDynamicBottomSheetRef>(null);

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      bouncesZoom={false}
      alwaysBounceVertical={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollViewContent}
    >
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

        <DynamicBottomSheet ref={settingsSheetRef}>
          <View style={{ height: 300 }} />
        </DynamicBottomSheet>
      </View>
    </ScrollView>
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
    marginLeft: 16,
  },
  imagePreviewParentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
  imagePreviewContainer: {
    marginTop: -20,
  },
});
