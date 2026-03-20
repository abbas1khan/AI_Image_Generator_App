import {
  LayoutChangeEvent,
  Modal,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { colors, gradientColors } from '../../../constants/colors';
import { screenHeight, screenWidth } from '../../../constants/appConstants';
import GradientBorderView from '../gradientborderview/GradientBorderView';

const ANIMATION_DURATION = 200;

interface IProps {
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
  swipeDownToClose?: boolean;
  duration?: number;
  dismissOnTapOutside?: boolean;
  showBackdrop?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export interface IDynamicBottomSheetRef {
  showSheet: () => void;
  hideSheet: () => void;
  isOpen: () => boolean;
}

const DynamicBottomSheet = React.forwardRef<IDynamicBottomSheetRef, IProps>(
  (props, ref) => {
    const {
      children,
      onClose,
      onOpen,
      containerStyle,
      swipeDownToClose = true,
      duration = ANIMATION_DURATION,
      dismissOnTapOutside = true,
      showBackdrop = true,
    } = props;

    const [visible, setVisible] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const { top } = useSafeAreaInsets();

    const defaultMaxHeight = screenHeight - top - 50;
    const maxHeight = Math.min(contentHeight, defaultMaxHeight);
    const slideUp = useSharedValue(defaultMaxHeight);

    const animationConfig = useMemo(
      () => ({
        duration,
        easing: Easing.out(Easing.cubic),
      }),
      [duration],
    );

    const showBottomSheet = useCallback(() => {
      slideUp.value = withTiming(0, animationConfig, () => {
        if (onOpen) {
          scheduleOnRN(onOpen);
        }
      });
    }, [animationConfig, onOpen]);

    const hideBottomSheet = useCallback(() => {
      slideUp.value = withTiming(maxHeight, animationConfig, () => {
        scheduleOnRN(setVisible, false);
        if (onClose) {
          scheduleOnRN(onClose);
        }
      });
    }, [maxHeight, animationConfig, onClose]);

    useEffect(() => {
      if (contentHeight > 0 && visible) {
        if (slideUp.value !== maxHeight) {
          slideUp.value = maxHeight;
        }
        showBottomSheet();
      }
    }, [contentHeight, visible, showBottomSheet]);

    useImperativeHandle(ref, () => ({
      showSheet: () => {
        setVisible(true);
      },
      hideSheet: () => {
        hideBottomSheet();
      },
      isOpen: () => visible,
    }));

    const handleContentLayout = useCallback((e: LayoutChangeEvent) => {
      setContentHeight(e.nativeEvent.layout.height);
    }, []);

    const animatedBackgroundColorStyle = useAnimatedStyle(() => {
      if (!showBackdrop) {
        return { backgroundColor: colors.transparent };
      }
      return {
        backgroundColor: interpolateColor(
          slideUp.value,
          [maxHeight, 0],
          [colors.overlayBlackTransparent, colors.overlayBlackLight],
        ),
      };
    });

    const animatedSheetStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: slideUp.value }],
    }));

    const pan = Gesture.Pan()
      .minDistance(10)
      .onUpdate((event) => {
        if (event.translationY < 0) return;
        slideUp.value = event.translationY;
      })
      .onEnd((event) => {
        if (maxHeight - event.translationY > maxHeight / 1.5) {
          slideUp.value = withTiming(0, animationConfig);
        } else {
          scheduleOnRN(hideBottomSheet);
        }
      })
      .enabled(swipeDownToClose);

    return (
      <Modal visible={visible} transparent onRequestClose={hideBottomSheet}>
        <Animated.View style={[styles.container, animatedBackgroundColorStyle]}>
          <Pressable
            disabled={!dismissOnTapOutside}
            style={styles.background}
            onPress={hideBottomSheet}
          />
          <Animated.View style={animatedSheetStyle} pointerEvents="auto">
            <GestureDetector gesture={pan}>
              <Animated.View
                onLayout={handleContentLayout}
                style={[styles.bottomSheet, containerStyle]}
              >
                {children}
                <GradientBorderView
                  pointerEvents="none"
                  colors={gradientColors.bottomSheet}
                  style={styles.gradientContainer}
                />
              </Animated.View>
            </GestureDetector>
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  },
);

export default DynamicBottomSheet;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
  },
  background: {
    flex: 1,
  },
  bottomSheet: {
    width: screenWidth,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.sheetBackground,
  },
  gradientContainer: {
    borderWidth: 2,
    height: 70,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
  },
});
