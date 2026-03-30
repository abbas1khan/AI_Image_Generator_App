import { IAIModel } from '../constants/aimodels';
import { IAspectRatio } from '../constants/aspectRatio';
import { IStylePreset } from '../constants/stylePresets';

export interface ImageData {
  id: string; // uuid v4
  prompt: string; // original user prompt
  imageUri: string; // base64 image data from Gemini
  createdAt: number; // Date.now()
  modelData: IAIModel;
  aspectRatio: IAspectRatio;
  stylePreset: IStylePreset;
}
