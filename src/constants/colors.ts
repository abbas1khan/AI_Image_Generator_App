// src/constants/colors.ts
//
// Single source of truth for every color used in the app.
// All values are derived from the design system established in the UI mockups.
// Never hardcode hex values in components — always reference this file.

export const colors = {
  // ─────────────────────────────────────────────
  // BACKGROUNDS
  // Dark layered surfaces from deepest to most elevated
  // ─────────────────────────────────────────────

  /** Deepest app background — page bg */
  background: '#07070f',

  /** Slightly lighter — used in old screens, kept for compat */
  backgroundAlt: '#080810',

  /** Cards, input containers, sheet bodies */
  surface: '#0f0f1a',

  /** Input zone bg (bottom bar), modal sheets */
  surfaceInput: '#0d0d1c',

  /** Elevated cards, dropdowns, selected rows */
  surfaceElevated: '#16162a',

  /** Darkest surface variant — chips, tag backgrounds */
  surfaceSunken: '#0a0a14',

  /** Tab bar / action bar background */
  tabBarBackground: '#0c0c18',

  /** Bottom sheet / modal surface */
  sheetBackground: '#0f0f1c',

  /** Canvas / image zone background */
  canvasBackground: '#09090f',

  /** White color */
  white: '#ffffff',

  /** Black color */
  black: '#000000',

  transparent: 'transparent',

  // ─────────────────────────────────────────────
  // BORDERS & DIVIDERS
  // ─────────────────────────────────────────────

  /** Default border — cards, inputs, chips */
  border: '#1e1e35',

  /** Slightly lighter border — elevated sheets, dropdown lists */
  borderElevated: '#2a2a4a',

  /** Tab bar top border */
  tabBarBorder: '#141426',

  /** Bottom sheet top border */
  sheetBorder: '#2a2a4a',

  /** Focused input border */
  borderFocused: '#3a3a6a',

  /** Subtle surface border used on canvas */
  borderSubtle: '#1e1e38',

  borderDark: '#2a2a45',

  // ─────────────────────────────────────────────
  // PRIMARY — Electric Indigo #7c6af7
  // The main brand accent used on CTAs, active states, icons
  // ─────────────────────────────────────────────

  /** Full primary — buttons, active tabs, focused borders */
  primary: '#7c6af7',

  /** Dimmed primary — disabled CTA, loading button bg */
  primaryDim: '#3d3580',

  /** Deeper dim — selected model dot alt */
  primaryDeep: '#534AB7',

  /** Glow overlay — ambient glow behind canvas */
  primaryGlow: 'rgba(124, 106, 247, 0.18)',

  /** Soft tint — icon badge bg on info toasts */
  primaryTint: 'rgba(124, 106, 247, 0.16)',

  /** Very faint tint — progress track fill, orbit glow */
  primaryFaint: 'rgba(124, 106, 247, 0.08)',

  /** Primary action border on chips/pills */
  primaryBorder: 'rgba(124, 106, 247, 0.3)',

  /** Selected chip background */
  primaryChipBg: '#2a1a4a',

  /** Selected chip border */
  primaryChipBorder: '#3d3580',

  // ─────────────────────────────────────────────
  // ACCENT — Warm Amber #f0a500
  // Used on Save actions, model indicators, warnings
  // ─────────────────────────────────────────────

  /** Full accent — Save button, amber model dot */
  accent: '#f0a500',

  /** Dim accent — disabled state */
  accentDim: 'rgba(240, 165, 0, 0.15)',

  /** Faint tint — warning toast badge bg */
  accentFaint: 'rgba(240, 165, 0, 0.08)',

  /** Accent border — warning borders */
  accentBorder: 'rgba(240, 165, 0, 0.3)',

  /** Deep amber — warning text color */
  accentDeep: '#7a5500',

  /** Muted amber text — warning message body */
  accentMuted: '#806030',

  // ─────────────────────────────────────────────
  // SUCCESS — Teal #1d9e75 / #4caf82
  // Used on saved confirmations, success toasts
  // ─────────────────────────────────────────────

  /** Primary success — checkmarks, success toast title */
  success: '#4caf82',

  /** Brighter teal — success toast dismiss icon */
  successBright: '#5DCAA5',

  /** Deep success — success border, success model dot */
  successDeep: '#1d9e75',

  /** Darker green — success toast border */
  successDark: '#0f6e56',

  /** Success toast background */
  successBg: '#071a10',

  /** Success icon badge background */
  successTint: 'rgba(29, 158, 117, 0.18)',

  /** Success faint — action button bg in success context */
  successFaint: 'rgba(29, 158, 117, 0.1)',

  /** Success border */
  successBorder: 'rgba(93, 202, 165, 0.3)',

  /** Success muted text — message body color */
  successMuted: '#3a7a62',

  // ─────────────────────────────────────────────
  // ERROR — Coral Red #ff5370
  // Used on delete, error toasts, destructive actions
  // ─────────────────────────────────────────────

  /** Full error — delete buttons, error toast title */
  error: '#ff5370',

  /** Error dim — error banner background, confirm button bg */
  errorDim: 'rgba(255, 83, 112, 0.15)',

  /** Error faint — action button bg */
  errorFaint: 'rgba(255, 83, 112, 0.08)',

  /** Error icon badge background */
  errorTint: 'rgba(255, 83, 112, 0.16)',

  /** Error border */
  errorBorder: 'rgba(255, 83, 112, 0.3)',

  /** Error toast background */
  errorBg: '#1a0608',

  /** Error deep — error toast border */
  errorDeep: '#7a1a22',

  /** Error muted — error toast message body */
  errorMuted: '#8a4050',

  // ─────────────────────────────────────────────
  // INFO — Indigo Blue
  // Used on info toasts and info-variant actions
  // ─────────────────────────────────────────────

  /** Info toast background */
  infoBg: '#060d1a',

  /** Info toast border */
  infoBorder: '#1a3a7a',

  /** Info muted text — info message body */
  infoMuted: '#444490',

  // ─────────────────────────────────────────────
  // NEON ACCENTS
  // Used in generated image aesthetics (not UI chrome)
  // ─────────────────────────────────────────────

  /** Neon purple — dragon/fantasy imagery */
  neonPurple: '#c060ff',

  /** Neon cyan — cyberpunk window lights */
  neonCyan: '#00e5ff',

  /** Neon pink-red — cyberpunk accent lights */
  neonPink: '#ff2070',

  // ─────────────────────────────────────────────
  // TEXT
  // ─────────────────────────────────────────────

  /** Headings, primary labels, user-typed text */
  textPrimary: '#eeeeff',

  /** Slightly softer — typed input text */
  textInput: '#d0d0f0',

  /** Section labels, secondary info */
  textSecondary: '#7878a8',

  /** Placeholder, inactive chips, disabled states */
  textMuted: '#3a3a5c',

  /** Very subtle — deepest muted, char count */
  textGhost: '#2a2a4a',

  /** Text on solid primary background */
  textOnPrimary: '#ffffff',

  /** Metadata tags on dark backgrounds */
  textMeta: '#5a5a7a',

  // ─────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────

  /** Active tab icon and label */
  tabActive: '#7c6af7',

  /** Inactive tab icon and label */
  tabInactive: '#3a3a5c',

  // ─────────────────────────────────────────────
  // OVERLAYS
  // ─────────────────────────────────────────────

  /** Modal / bottom sheet backdrop */
  overlay: 'rgba(8, 8, 16, 0.82)',

  /** Lighter overlay — dimmed content behind sheets */
  overlayLight: 'rgba(8, 8, 16, 0.72)',

  /** Frosted glass — floating action pills on images */
  overlayGlass: 'rgba(10, 10, 22, 0.78)',

  /** Image metadata tag bg */
  overlayTag: 'rgba(7, 7, 15, 0.72)',

  /** White tint overlay */
  overlayWhite: 'rgba(255, 255, 255, 0.06)',

  overlayBlackLight: 'rgba(0,0,0,0.6)',
  overlayBlackTransparent: 'rgba(0,0,0,0)',
  overlayWhiteTransparent: 'rgba(255,255,255,0)',

  rgbaBlack: (alpha: number) => `rgba(0, 0, 0, ${alpha})`,
  rgbaWhite: (alpha: number) => `rgba(255, 255, 255, ${alpha})`,
} as const;

export type ColorKey = keyof typeof colors;

export const gradientColors = {
  bottomSheet: [colors.border, colors.transparent],
} as { [key: string]: string[] };

export type GradientColorsKey = {
  [K in keyof typeof gradientColors]: string[];
};
