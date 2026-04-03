import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import type { ToastConfig } from './types';
import { screenHeight } from '../../constants/appConstants';

export const DEFAULT_TOAST_DURATION_MS = 3000;
export const DEFAULT_TOAST_SLIDE_MS = 250;
export const DEFAULT_TOAST_VERTICAL_OFFSET = 32;

export function resolveToastTiming(config: ToastConfig) {
  return {
    duration: config.duration ?? DEFAULT_TOAST_DURATION_MS,
    slideMs: config.slideAnimationDuration ?? DEFAULT_TOAST_SLIDE_MS,
    // When provided, verticalOffset is absolute bottom inset; also use it
    // as the slide distance so callers can set 0 and truly slide to bottom.
    verticalOffset: Number.isFinite(config.verticalOffset)
      ? (config.verticalOffset as number)
      : DEFAULT_TOAST_VERTICAL_OFFSET,
  };
}

export function useToastAnimation() {
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const cancelToken = useSharedValue(0);

  const [config, setConfig] = useState<ToastConfig | null>(null);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);
  const measuredHeightRef = useRef(0);
  const startedTokenRef = useRef(0);

  const animateOut = useCallback(
    (slideMs: number, offScreenY: number, onDone?: () => void) => {
      translateY.value = withTiming(
        offScreenY,
        { duration: slideMs, easing: Easing.in(Easing.cubic) },
        (finished) => {
          if (finished && onDone) scheduleOnRN(onDone);
        },
      );
      opacity.value = withTiming(0, { duration: slideMs });
    },
    [translateY, opacity],
  );

  const animateIn = useCallback(
    (slideMs: number, onDone?: () => void) => {
      translateY.value = withTiming(
        0,
        { duration: slideMs, easing: Easing.out(Easing.cubic) },
        (finished) => {
          if (finished && onDone) scheduleOnRN(onDone);
        },
      );
      opacity.value = withTiming(1, { duration: slideMs });
    },
    [translateY, opacity],
  );

  const hideToast = useCallback(() => {
    cancelToken.value += 1;
    const { slideMs, verticalOffset } = resolveToastTiming(
      config ?? ({} as ToastConfig),
    );
    const offScreenY = (measuredHeightRef.current || height) + verticalOffset;
    animateOut(slideMs, offScreenY, () => setVisible(false));
  }, [animateOut, cancelToken, config, height]);

  const startToast = useCallback(
    (config: ToastConfig, measuredHeight: number) => {
      if (!measuredHeight) return;

      const { duration, slideMs, verticalOffset } = resolveToastTiming(config);
      const offScreenY = measuredHeight + verticalOffset;
      const tokenAtStart = cancelToken.value;

      translateY.value = offScreenY;
      opacity.value = 0;

      animateIn(slideMs, () => {
        translateY.value = withDelay(
          duration,
          withTiming(
            offScreenY,
            { duration: slideMs, easing: Easing.in(Easing.cubic) },
            (finished) => {
              if (!finished) return;
              if (cancelToken.value !== tokenAtStart) return;
              scheduleOnRN(setVisible, false);
            },
          ),
        );
        opacity.value = withDelay(
          duration,
          withTiming(0, { duration: slideMs }),
        );
      });
    },
    [animateIn, cancelToken, opacity, translateY],
  );

  const startToastAfterMeasure = useCallback(() => {
    if (!visible || !config) return;
    const h = measuredHeightRef.current || height;
    if (!h) return;
    if (startedTokenRef.current === cancelToken.value) return;
    startedTokenRef.current = cancelToken.value;
    startToast(config, h);
  }, [cancelToken, config, height, startToast, visible]);

  const showToast = useCallback(
    (config: ToastConfig) => {
      setConfig(config);
      setVisible(true);
      cancelToken.value += 1;
      startedTokenRef.current = 0;
    },
    [cancelToken],
  );

  const handleOnLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      if (!visible || !config || h === 0) return;
      measuredHeightRef.current = h;
      setHeight(h);
    },
    [config, visible],
  );

  useEffect(() => {
    startToastAfterMeasure();
  }, [startToastAfterMeasure]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return {
    config,
    visible,
    showToast,
    hideToast,
    animatedStyle,
    handleOnLayout,
  };
}
