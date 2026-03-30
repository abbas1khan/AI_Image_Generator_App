export const AI_MODELS: IAIModel[] = [
  {
    name: 'Flux Schnell',
    model: 'flux',
  },
  {
    name: 'Z-Image Turbo',
    model: 'zimage',
  },
  {
    name: 'FLUX.2 Klein 4B',
    model: 'klein',
  },
];

export interface IAIModel {
  name: string;
  model: string;
}
