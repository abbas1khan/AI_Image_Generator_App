import { ViewStyle } from 'react-native';

export function getBorderStyles(flatStyle: ViewStyle) {
  const bw = (flatStyle?.borderWidth ?? 0) as number;
  const base = (flatStyle?.borderRadius ?? 0) as number;
  const tl = (flatStyle?.borderTopLeftRadius ?? 0) as number;
  const tr = (flatStyle?.borderTopRightRadius ?? 0) as number;
  const bl = (flatStyle?.borderBottomLeftRadius ?? 0) as number;
  const br = (flatStyle?.borderBottomRightRadius ?? 0) as number;

  const hasIndividualRadius = [tl, tr, bl, br].some((r) => r > 0);

  return {
    borderWidth: bw,
    radii: {
      outer: hasIndividualRadius
        ? {
            borderTopLeftRadius: tl,
            borderTopRightRadius: tr,
            borderBottomLeftRadius: bl,
            borderBottomRightRadius: br,
          }
        : { borderRadius: base },
      inner: hasIndividualRadius
        ? {
            borderTopLeftRadius: Math.max(tl - bw, 0),
            borderTopRightRadius: Math.max(tr - bw, 0),
            borderBottomLeftRadius: Math.max(bl - bw, 0),
            borderBottomRightRadius: Math.max(br - bw, 0),
          }
        : { borderRadius: Math.max(base - bw, 0) },
    },
  };
}

export function getStrippedStyle(flatStyle: ViewStyle) {
  // Remove border-related keys without binding unused variables.
  const stripped: ViewStyle = { ...flatStyle };
  delete stripped.borderWidth;
  delete stripped.borderColor;
  delete stripped.borderRadius;
  delete stripped.borderTopLeftRadius;
  delete stripped.borderTopRightRadius;
  delete stripped.borderBottomLeftRadius;
  delete stripped.borderBottomRightRadius;
  return stripped;
}
