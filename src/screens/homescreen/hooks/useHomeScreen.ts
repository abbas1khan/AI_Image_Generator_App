import { useCallback } from 'react';
import axios from 'axios';
import { useImageStore } from '../../../store/imageStore';
import useHomeScreenStates from './useHomeScreenStates';
import { generatePollinationsImageUri } from '../../../services/pollinationsUrlBuilder';
import { buildImageData } from '../../../utils/buildImageData';

const useHomeScreen = () => {
  const states = useHomeScreenStates();
  const storeImage = useImageStore((state) => state.storeImage);

  const {
    aspectRatio,
    selectedModel,
    selectedStylePreset,
    setGeneratedImageData,
    setIsError,
    setIsGenerating,
  } = states;

  const generateImage = useCallback(
    (prompt: string) => {
      if (!prompt) {
        return;
      }

      setIsGenerating(true);
      setGeneratedImageData(null);
      setIsError(false);

      const url = generatePollinationsImageUri({
        prompt,
        model: selectedModel.model,
        aspectRatio,
        stylePresetValue: selectedStylePreset.value,
      });
      console.log('🚀 ~ useHomeScreen.ts:37 ~ useHomeScreen ~ url:', url);

      axios
        .get(url)
        .then(() => {
          const imageData = buildImageData({
            prompt,
            imageUri: url,
            modelData: selectedModel,
            aspectRatio,
            stylePreset: selectedStylePreset,
          });

          setGeneratedImageData(imageData);
          storeImage(imageData);
        })
        .catch((error) => {
          console.error('useHomeScreen.generateImage error:', error);
          console.error(
            'useHomeScreen.generateImage error:',
            error?.error?.message,
          );
          setIsGenerating(false);
          setIsError(true);
        });
    },
    [aspectRatio, selectedModel, selectedStylePreset, storeImage],
  );

  return {
    states,
    generateImage,
  };
};

export default useHomeScreen;
