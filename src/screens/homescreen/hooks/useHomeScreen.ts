import axios from 'axios';
import { useImageStore } from '../../../store/imageStore';
import useHomeScreenStates from './useHomeScreenStates';
import { GoogleGenAI } from '@google/genai';
import { API_BASE_URL, POLLINATIONS_API_KEY } from '@env';
import uuid from 'react-native-uuid';

type UseHomeScreenProps = {
  googleAI: GoogleGenAI;
};

enum Model {
  GPT_IMAGE = 'gptimage',
  FLUX = 'flux',
  ZIMAGE = 'zimage',
  KLEIN = 'klein',
  GROK_IMAGINE = 'grok-imagine',
  QWEN_IMAGE = 'qwen-image',
}

function randomInt() {
  return Math.floor(Math.random() * 2147483648);
}
function buildUrlParams(params: Record<string, any>) {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    urlParams.append(key, value.toString());
  });
  return urlParams.toString();
}

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

    const apiParams = {
      key: POLLINATIONS_API_KEY,
      model: Model.FLUX,
      width: states.aspectRatio.width,
      height: states.aspectRatio.height,
      seed: randomInt(),
      // nonce: Date.now(),
      enhance: false,
      negative_prompt: 'blurry, worst quality, low-res',
      safe: false,
      transparent: false,
      nologo: true,
    };
    const API_PARAMS = buildUrlParams(apiParams);
    const url = `${API_BASE_URL}/${encodeURIComponent(prompt)}?${API_PARAMS}`;

    console.log('🚀 ~ useHomeScreen.ts:65 ~ generateImage ~ url:', url);

    // await new Promise((res) => {
    //   setTimeout(() => {
    //     res(null);
    //   }, 1000);
    // });

    await axios
      .get(url)
      .then((response) => {
        console.log('🚀 ~ useHomeScreen.ts:80 ~ generateImage ~ response:');
        const imageData = {
          id: `${uuid.v4()}-${Date.now()}`,
          createdAt: Date.now(),
          prompt,
          imageUri: url,
          mimeType: 'image/png',
          modelData: states.selectedModel,
          aspectRatio: states.aspectRatio,
          stylePreset: states.selectedStylePreset,
        };
        states.setGeneratedImageData(imageData);
        storeImage(imageData);
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
