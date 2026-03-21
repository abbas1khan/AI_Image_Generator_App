import { generateImageFromPrompt } from '../../../services/googleservice';
import { useImageStore } from '../../../store/imageStore';
import {
  buildImageData,
  convertBase64ToUri,
  extractImageFromResponse,
} from '../../../utils/ImageUtil';
import useHomeScreenStates from './useHomeScreenStates';
import { GoogleGenAI } from '@google/genai';

type UseHomeScreenProps = {
  googleAI: GoogleGenAI;
};

const useHomeScreen = ({ googleAI }: UseHomeScreenProps) => {
  const states = useHomeScreenStates();
  const storeImage = useImageStore((state) => state.storeImage);

  const generateImage = async (prompt: string) => {
    if (!prompt) {
      return;
    }

    states.setIsGenerating(true);
    states.setGeneratedImageData(null);
    states.setIsError(false);

    const finalPrompt = `Generate an image based on this prompt: ${prompt}`;
    await generateImageFromPrompt({
      googleAI,
      model: states.selectedModel.model,
      prompt: finalPrompt,
      aspectRatio: states.aspectRatio.text,
    })
      .then((response) => {
        const { imageBase64, mimeType, finishReason } =
          extractImageFromResponse(response);
        if (imageBase64 && mimeType) {
          const finalImageUri = convertBase64ToUri(imageBase64, mimeType);
          const imageData = buildImageData({
            prompt,
            imageUri: finalImageUri,
            mimeType,
            modelData: states.selectedModel,
            aspectRatio: states.aspectRatio,
          });
          states.setGeneratedImageData(imageData);
          storeImage(imageData);
        } else {
          console.error(
            '🚀 ~ useHomeScreen.ts:49 ~ generateImage ~ finishReason:',
            finishReason,
          );
          states.setIsError(true);
        }
      })
      .catch((error) => {
        console.error(
          '🚀 ~ useHomeScreen.ts:53 ~ generateImage ~ error:',
          error,
        );
        states.setIsError(true);
      })
      .finally(() => {
        states.setIsGenerating(false);
      });
  };

  return {
    states,
    generateImage,
  };
};

export default useHomeScreen;
