import { IAIModel } from '../constants/aimodels';
import { IAspectRatio } from '../constants/aspectRatio';
import { IStylePreset } from '../constants/stylePresets';
import { ImageData } from '../store/types';
import uuid from 'react-native-uuid';

export const buildImageData = ({
  prompt,
  imageUri,
  modelData,
  aspectRatio,
  stylePreset,
}: {
  prompt: string;
  imageUri: string;
  modelData: IAIModel;
  aspectRatio: IAspectRatio;
  stylePreset: IStylePreset;
}): ImageData => {
  return {
    id: `${uuid.v4()}-${Date.now()}`,
    prompt,
    imageUri,
    createdAt: Date.now(),
    modelData,
    aspectRatio,
    stylePreset,
  };
};
