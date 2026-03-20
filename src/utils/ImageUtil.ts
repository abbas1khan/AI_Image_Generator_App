import { ImageData } from '../store/types';
import uuid from 'react-native-uuid';

export const extractImageFromResponse = (response: any) => {
  let result = {
    imageBase64: '',
    mimeType: '',
    finishReason: response?.candidates?.[0]?.finishReason || '',
  };
  const parts = response?.candidates?.[0]?.content?.parts ?? [];

  for (const inlinePart of parts) {
    if (
      inlinePart?.inlineData?.mimeType?.startsWith('image/') &&
      inlinePart?.inlineData?.data
    ) {
      result = {
        imageBase64: inlinePart?.inlineData?.data,
        mimeType: inlinePart?.inlineData?.mimeType,
        finishReason: result.finishReason,
      };
    }
  }

  return result;
};

export const convertBase64ToUri = (base64: string, mimeType: string) => {
  return `data:${mimeType};base64,${base64}`;
};

export const buildImageData = ({
  prompt,
  imageUri,
  mimeType,
  modelData,
  aspectRatio,
}: {
  prompt: string;
  imageUri: string;
  mimeType: string;
  modelData: { name: string; model: string };
  aspectRatio: { text: string; value: number };
}): ImageData => {
  return {
    id: `${uuid.v4()}-${Date.now()}`,
    prompt,
    imageUri,
    mimeType,
    createdAt: Date.now(),
    modelData,
    aspectRatio,
  };
};
