import { useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useImageStore } from '../../../store/imageStore';
import useHomeScreenStates from './useHomeScreenStates';
import { generatePollinationsImageUri } from '../../../services/pollinationsUrlBuilder';
import { buildImageData } from '../../../utils/buildImageData';

interface UseHomeScreenProps {
  onError: (error: AxiosError) => void;
}

const useHomeScreen = ({ onError }: UseHomeScreenProps) => {
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
          onError?.(error);
          setIsGenerating(false);
          setIsError(true);
        });
    },
    [aspectRatio, selectedModel, selectedStylePreset, storeImage, onError],
  );

  return {
    states,
    generateImage,
  };
};

export default useHomeScreen;
