export enum ToastVariant {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export interface ToastConfig {
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  slideAnimationDuration?: number;
  /**
   * Absolute bottom inset (px) for the toast while visible.
   * - Pass `0` to touch the bottom edge.
   * - Omit to use the platform default (iOS 40 / Android 24).
   * Also used as the slide distance; omit to use the default 32px.
   */
  verticalOffset?: number;
  /** Stacking order for the toast wrapper; omit for default (1000). */
  zIndex?: number;
}

export interface ToastRef {
  show: (config: ToastConfig) => void;
  hide: () => void;
}
