import { API_BASE_URL, POLLINATIONS_API_KEY } from '@env';
import { IAspectRatio } from '../constants/aspectRatio';

const randomInt = () => Math.floor(Math.random() * 2147483648);

const buildUrlParams = (params: Record<string, any>) => {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    urlParams.append(key, value.toString());
  });
  return urlParams.toString();
};

type GeneratePollinationsImageUriParams = {
  prompt: string;
  model: string;
  aspectRatio: IAspectRatio;
  stylePresetValue: string;
};

export const generatePollinationsImageUri = ({
  prompt,
  model,
  aspectRatio,
  stylePresetValue,
}: GeneratePollinationsImageUriParams): string => {
  const trimmedPrompt = prompt?.trim();
  if (!trimmedPrompt) throw new Error('Prompt is required');

  const stylePart = stylePresetValue?.trim();
  const finalPrompt = stylePart
    ? `${trimmedPrompt}, ${stylePart}`
    : trimmedPrompt;

  const apiParams = {
    key: POLLINATIONS_API_KEY,
    model,
    width: aspectRatio.width,
    height: aspectRatio.height,
    seed: randomInt(),
    enhance: false,
    negative_prompt: 'blurry, worst quality, low-res',
    safe: false,
    transparent: false,
    nologo: true,
  };

  const API_PARAMS = buildUrlParams(apiParams);
  const url = `${API_BASE_URL}/${encodeURIComponent(
    finalPrompt,
  )}?${API_PARAMS}`;

  return url;
};
