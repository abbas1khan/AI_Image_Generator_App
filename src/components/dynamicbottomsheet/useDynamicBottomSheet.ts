import { BackHandler, LayoutChangeEvent } from 'react-native';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { isAndroid, windowHeight } from '../../constants/appConstants';

const ANIMATION_DURATION = 250;

export interface IDynamicBottomSheetRef {
  showSheet: () => void;
  hideSheet: () => void;
  isOpen: () => boolean;
}

const DISMISS_FRACTION = 1 / 3;
const VELOCITY_DISMISS = 900;

export interface UseDynamicBottomSheetParams {
  ref: React.Ref<IDynamicBottomSheetRef | null>;
  duration?: number;
  swipeDownToClose?: boolean;
  showBackdrop?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export function useDynamicBottomSheet({
  ref,
  duration = ANIMATION_DURATION,
  swipeDownToClose = true,
  showBackdrop = true,
  onClose,
  onOpen,
}: UseDynamicBottomSheetParams) {
  const [visible, setVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const { top } = useSafeAreaInsets();

  const defaultMaxHeight = windowHeight - top - 50;
  const maxHeight = Math.min(contentHeight, defaultMaxHeight);

  const slideUp = useSharedValue(defaultMaxHeight);
  const maxHeightSV = useSharedValue(maxHeight);
  const panStartSlide = useSharedValue(0);

  const openAnimationStartedRef = useRef(false);
  const isPresentingRef = useRef(false);
  const isClosingRef = useRef(false);

  useEffect(() => {
    maxHeightSV.value = maxHeight;
  }, [maxHeight, maxHeightSV]);

  const animationConfig = useMemo(
    () => ({
      duration,
      easing: Easing.out(Easing.cubic),
    }),
    [duration],
  );

  const hidePortal = useCallback(() => {
    isPresentingRef.current = false;
    openAnimationStartedRef.current = false;
    isClosingRef.current = false;
    setVisible(false);
    onClose?.();
  }, [onClose]);

  const showBottomSheet = useCallback(() => {
    slideUp.value = withTiming(0, animationConfig, () => {
      if (onOpen) {
        scheduleOnRN(onOpen);
      }
    });
  }, [animationConfig, onOpen, slideUp]);

  const hideBottomSheet = useCallback(() => {
    if (!isPresentingRef.current || !visible || isClosingRef.current) return;

    isClosingRef.current = true;
    slideUp.value = withTiming(maxHeightSV.value, animationConfig, () => {
      scheduleOnRN(hidePortal);
    });
  }, [animationConfig, hidePortal, maxHeightSV, slideUp, visible]);

  useEffect(() => {
    if (contentHeight <= 0 || !visible || openAnimationStartedRef.current) {
      return;
    }
    openAnimationStartedRef.current = true;
    slideUp.value = maxHeight;
    showBottomSheet();
  }, [contentHeight, visible, maxHeight, showBottomSheet, slideUp]);

  useEffect(() => {
    if (!isAndroid || !visible) {
      return;
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        hideBottomSheet();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [visible, hideBottomSheet]);

  useImperativeHandle(
    ref,
    () => ({
      showSheet: () => {
        isClosingRef.current = false;
        isPresentingRef.current = true;
        setVisible(true);
      },
      hideSheet: () => {
        hideBottomSheet();
      },
      isOpen: () => isPresentingRef.current,
    }),
    [hideBottomSheet],
  );

  const handleContentLayout = useCallback((e: LayoutChangeEvent) => {
    const heightValue = e?.nativeEvent?.layout?.height;
    if (heightValue > 0) {
      setContentHeight(heightValue);
    }
  }, []);

  const animatedBackgroundColorStyle = useAnimatedStyle(() => {
    if (!showBackdrop) {
      return { backgroundColor: colors.transparent };
    }
    const mh = maxHeightSV.value;
    return {
      backgroundColor: interpolateColor(
        slideUp.value,
        [mh, 0],
        [colors.overlayBlackTransparent, colors.overlayBlackLight],
      ),
    };
  }, [showBackdrop]);

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideUp.value }],
  }));

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(10)
        .onBegin(() => {
          panStartSlide.value = slideUp.value;
        })
        .onUpdate((event) => {
          const mh = maxHeightSV.value;
          if (event.translationY < 0) {
            return;
          }
          const next = panStartSlide.value + event.translationY;
          slideUp.value = Math.min(Math.max(next, 0), mh);
        })
        .onEnd((event) => {
          const mh = maxHeightSV.value;
          const dismissByDrag = slideUp.value >= mh * DISMISS_FRACTION;
          const dismissByFlick =
            event.velocityY > VELOCITY_DISMISS && slideUp.value > 12;
          if (dismissByDrag || dismissByFlick) {
            scheduleOnRN(hideBottomSheet);
          } else {
            slideUp.value = withTiming(0, animationConfig);
          }
        })
        .enabled(swipeDownToClose),
    [
      animationConfig,
      hideBottomSheet,
      maxHeightSV,
      panStartSlide,
      slideUp,
      swipeDownToClose,
    ],
  );

  return {
    visible,
    pan,
    animatedBackgroundColorStyle,
    animatedSheetStyle,
    handleContentLayout,
    hideBottomSheet,
  };
}
