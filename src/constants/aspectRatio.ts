export interface IAspectRatio {
  text: string;
  value: number;
  width: number;
  height: number;
}

const BASE = 1024;

const RATIOS = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];

/**
 * Parse "w:h"
 */
const parseRatio = (ratio: string) => {
  const [w, h] = ratio.split(':').map(Number);

  if (!w || !h) {
    throw new Error(`Invalid ratio: ${ratio}`);
  }

  return { w, h };
};

/**
 * Preserve orientation:
 * - Landscape → width = BASE
 * - Portrait → height = BASE
 * - Square → both = BASE
 */
const getDimensions = (w: number, h: number) => {
  if (w === h) {
    return {
      width: BASE,
      height: BASE,
    };
  }

  // Landscape
  if (w > h) {
    return {
      width: BASE,
      height: Math.round((BASE * h) / w),
    };
  }

  // Portrait
  return {
    height: BASE,
    width: Math.round((BASE * w) / h),
  };
};

export const ASPECT_RATIOS: IAspectRatio[] = RATIOS.map((text) => {
  const { w, h } = parseRatio(text);

  return {
    text,
    value: w / h,
    ...getDimensions(w, h),
  };
});
