export const AI_MODELS: IAIModel[] = [
  {
    name: 'Flux',
    model: 'flux',
  },
  {
    name: 'ZImage',
    model: 'zimage',
  },
  {
    name: 'Klein',
    model: 'klein',
  },
  {
    name: 'GPT Image',
    model: 'gptimage',
  },
  {
    name: 'Grok Imagine',
    model: 'grok-imagine',
  },
  {
    name: 'Qwen Image',
    model: 'qwen-image',
  },
];

export interface IAIModel {
  name: string;
  model: string;
}
