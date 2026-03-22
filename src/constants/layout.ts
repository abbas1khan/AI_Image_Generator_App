// src/constants/layout.ts
//
// Single source of truth for every layout, spacing, typography,
// and sizing token used in the app.
// Never hardcode numeric values in components — always reference this file.

// ─────────────────────────────────────────────
// SPACING
// Base-4 scale used for padding, margin, gap
// ─────────────────────────────────────────────

export const Spacing = {
  /** 4px — tight gaps, icon internal padding */
  xs: 4,

  /** 8px — compact gaps between sibling elements */
  sm: 8,

  /** 12px — medium-tight spacing */
  md2: 12,

  /** 16px — standard component padding */
  md: 16,

  /** 20px — slightly generous padding */
  lg2: 20,

  /** 24px — section gaps, card padding */
  lg: 24,

  /** 32px — large section gaps */
  xl: 32,

  /** 48px — bottom scroll padding, large gaps */
  xxl: 48,
} as const;

// ─────────────────────────────────────────────
// BORDER RADIUS
// ─────────────────────────────────────────────

export const Radius = {
  /** 4px — very subtle rounding, progress bars */
  xs: 4,

  /** 8px — small chips, badges, tags */
  sm: 8,

  /** 12px — standard cards, inputs */
  md: 12,

  /** 16px — large cards, bottom sheet buttons */
  lg: 16,

  /** 18px — legacy card radius */
  lg2: 18,

  /** 20px — canvas / image zone */
  canvas: 20,

  /** 24px — modal sheets, bottom input zone */
  xl: 24,

  /** 28px — large bottom sheets */
  xxl: 28,

  /** 44px — phone frame */
  phone: 44,

  /** 52px — new phone frame (v2 design) */
  phoneV2: 52,

  /** 999px — fully circular / pill shapes */
  full: 999,
} as const;

// ─────────────────────────────────────────────
// FONT SIZES
// ─────────────────────────────────────────────

export const FontSize = {
  /** 10px — section labels (ALL CAPS), metadata tags */
  label: 10,

  /** 11px — small secondary text, toast messages, chip text */
  xs: 11,

  /** 12px — action button labels, card subtitles */
  sm: 12,

  /** 13px — secondary body text, small inputs */
  sm2: 13,

  /** 14px — prompt input text, suggestion pills */
  input: 14,

  /** 15px — standard body text, nav labels, primary UI text */
  md: 15,

  /** 16px — medium emphasis text */
  md2: 16,

  /** 18px — card headers, modal titles */
  lg: 18,

  /** 22px — screen sub-headings */
  xl: 22,

  /** 26px — compact screen titles (v2 design) */
  title: 26,

  /** 28px — screen titles */
  xxl: 28,

  /** 36px — large display headings */
  display: 36,
} as const;

// ─────────────────────────────────────────────
// FONT FAMILIES
// ─────────────────────────────────────────────

export const fontFamily = {
  light: 'Onest-Light',
  extraBold: 'Onest-ExtraBold',
  extraLight: 'Onest-ExtraLight',
  medium: 'Onest-Medium',
  thin: 'Onest-Thin',
  bold: 'Onest-Bold',
  semiBold: 'Onest-SemiBold',
  regular: 'Onest-Regular',
  black: 'Onest-Black',
} as const;

// ─────────────────────────────────────────────
// LETTER SPACING
// ─────────────────────────────────────────────

export const LetterSpacing = {
  /** 0.2px — subtle, toast titles */
  xs: 0.2,

  /** 0.3px — header subtitle */
  sm: 0.3,

  /** 0.5px — small labels, action labels */
  md: 0.5,

  /** 1px — nav labels, suggestion pill text */
  lg: 1,

  /** 2px — detail labels */
  xl: 2,

  /** 3px — section labels (PROMPT, MODEL etc.) */
  section: 3,

  /** 4px — screen header labels (AI IMAGE) */
  header: 4,

  /** 5px — app name eyebrow (LUMINA) */
  brand: 5,
} as const;

// ─────────────────────────────────────────────
// LINE HEIGHT
// ─────────────────────────────────────────────

export const LineHeight = {
  /** 16px — compact text, small chips */
  xs: 16,

  /** 18px — error banners, toast messages */
  sm: 18,

  /** 20px — body secondary text */
  md: 20,

  /** 22px — standard body, toast body */
  body: 22,

  /** 24px — prompt text, standard input */
  input: 24,

  /** 40px — large display screen titles */
  display: 40,
} as const;

// ─────────────────────────────────────────────
// ICON SIZES
// ─────────────────────────────────────────────

export const IconSize = {
  /** 14px — inline action icons (copy, check in pills) */
  xs: 14,

  /** 16px — small contextual icons */
  sm: 16,

  /** 18px — bottom bar icon buttons */
  bar: 18,

  /** 20px — standard icons */
  md: 20,

  /** 22px — tab bar icons */
  tab: 22,

  /** 24px — large action icons */
  lg: 24,

  /** 32px — emphasis icons */
  xl: 32,

  /** 48px — empty state illustration icons */
  hero: 48,
} as const;

// ─────────────────────────────────────────────
// COMPONENT SIZES
// Fixed dimensions for interactive elements
// ─────────────────────────────────────────────

export const ComponentSize = {
  /** 34px — toast icon badge, avatar (small) */
  iconBadgeSm: 34,

  /** 36px — action bar divider height */
  actionDivider: 36,

  /** 38px — ghost/icon buttons (v2 home design) */
  iconBtnSm: 38,

  /** 40px — standard circular icon button (preview screen) */
  iconBtn: 40,

  /** 42px — icon button variant (old design) */
  iconBtnLg: 42,

  /** 44px — avatar circle, touch target minimum */
  avatar: 44,

  /** 52px — modal icon badge */
  modalIcon: 52,

  /** 56px — sheet icon badge */
  sheetIcon: 56,

  /** 60px — confirm modal icon badge */
  confirmIcon: 60,

  /** 64px — empty state icon wrapper */
  emptyIcon: 64,

  /** 88px — large empty state icon wrapper */
  emptyIconLg: 88,

  /** 100px — orbital ring animation wrapper */
  orbitRing: 100,
} as const;

// ─────────────────────────────────────────────
// NAVIGATION & CHROME HEIGHTS
// ─────────────────────────────────────────────

/** Bottom tab bar total height (icon + label + padding) */
export const TabBarHeight = 64;

/** Bottom input zone minimum height */
export const InputZoneMinHeight = 100;

/** Action bar height in PreviewScreen */
export const ActionBarHeight = 88;

/** Standard header height */
export const HeaderHeight = 56;

// ─────────────────────────────────────────────
// Z-INDEX
// ─────────────────────────────────────────────

export const ZIndex = {
  /** Base content layer */
  base: 0,

  /** Elevated cards */
  card: 1,

  /** Bottom sheet backdrop */
  backdrop: 5,

  /** Bottom sheet panel */
  sheet: 10,

  /** Modal dialogs */
  modal: 20,

  /** Toast notifications — above everything */
  toast: 9999,
} as const;

// ─────────────────────────────────────────────
// OPACITY
// ─────────────────────────────────────────────

export const Opacity = {
  /** Completely invisible */
  none: 0,

  /** Faint — background grid patterns */
  faint: 0.04,

  /** Disabled state */
  disabled: 0.35,

  /** Dimmed — content behind sheets */
  dimmed: 0.28,

  /** Semi-visible — inactive tabs */
  muted: 0.4,

  /** Visible but secondary */
  secondary: 0.6,

  /** Almost full */
  high: 0.85,

  /** Full opacity */
  full: 1,
} as const;

// ─────────────────────────────────────────────
// ANIMATION DURATIONS (ms)
// ─────────────────────────────────────────────

export const Duration = {
  /** 180ms — fast dismiss (toast out, modal fade out) */
  fast: 180,

  /** 200ms — standard fade in */
  normal: 200,

  /** 300ms — page transitions, gallery fade */
  medium: 300,

  /** 400ms — spring animations */
  slow: 400,

  /** 800ms — spinner rotation cycle */
  spinner: 800,

  /** 2000ms — progress bar slide */
  progress: 2000,

  /** 3000ms — success toast auto-dismiss */
  toastSuccess: 3000,

  /** 4000ms — warning toast auto-dismiss */
  toastWarning: 4000,

  /** 5000ms — error toast auto-dismiss */
  toastError: 5000,
} as const;

// ─────────────────────────────────────────────
// TYPE EXPORTS
// ─────────────────────────────────────────────

export type SpacingKey = keyof typeof Spacing;
export type RadiusKey = keyof typeof Radius;
export type FontSizeKey = keyof typeof FontSize;
export type IconSizeKey = keyof typeof IconSize;
export type ComponentSizeKey = keyof typeof ComponentSize;
export type ZIndexKey = keyof typeof ZIndex;
export type OpacityKey = keyof typeof Opacity;
export type DurationKey = keyof typeof Duration;
