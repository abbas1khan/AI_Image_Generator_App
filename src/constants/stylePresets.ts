export const STYLE_PRESETS = [
  { label: '✨ Auto', value: '' },
  { label: '🎨 Artistic', value: 'in an artistic oil painting style' },
  { label: '📸 Photo', value: 'as a photorealistic photograph' },
  { label: '🌸 Anime', value: 'in anime illustration style' },
  { label: '🖼️ Sketch', value: 'as a detailed pencil sketch' },
  { label: '🌌 Fantasy', value: 'as epic fantasy concept art' },
  { label: '🤖 Cyberpunk', value: 'in neon cyberpunk aesthetic' },
];

export type IStylePreset = {
  label: string;
  value: string;
};
