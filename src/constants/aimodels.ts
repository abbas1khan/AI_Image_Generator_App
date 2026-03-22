export const AI_MODELS: IAIModel[] = [
  {
    name: 'Nano Banana',
    model: 'gemini-2.5-flash-image',
  },
  {
    name: 'Nano Banana 2',
    model: 'gemini-3.1-flash-image-preview',
  },
  {
    name: 'Nano Banana Pro',
    model: 'gemini-3-pro-image-preview',
  },
];

export interface IAIModel {
  name: string;
  model: string;
}
