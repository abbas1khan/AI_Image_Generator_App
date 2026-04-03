import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { colors, gradientColors } from '../../constants/colors';
import { screenHeight, screenWidth } from '../../constants/appConstants';
import GradientBorderView from '../gradientborderview/GradientBorderView';
import { Portal } from '@gorhom/portal';
import {
  useDynamicBottomSheet,
  type IDynamicBottomSheetRef,
} from './useDynamicBottomSheet';

export type { IDynamicBottomSheetRef };

const DEFAULT_PORTAL_HOST = 'settingsBottomSheet';

interface DynamicBottomSheetProps {
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
  swipeDownToClose?: boolean;
  duration?: number;
  dismissOnTapOutside?: boolean;
  showBackdrop?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  /** Must match a `PortalHost` name in the app tree. */
  portalHostName?: string;
}

const DynamicBottomSheet = React.forwardRef<
  IDynamicBottomSheetRef,
  DynamicBottomSheetProps
>((props, ref) => {
  const {
    children,
    containerStyle,
    swipeDownToClose = true,
    duration,
    dismissOnTapOutside = true,
    showBackdrop = true,
    portalHostName = DEFAULT_PORTAL_HOST,
  } = props;

  const {
    visible,
    pan,
    animatedBackgroundColorStyle,
    animatedSheetStyle,
    handleContentLayout,
    hideBottomSheet,
  } = useDynamicBottomSheet({
    ref,
    duration,
    swipeDownToClose,
    showBackdrop,
    onClose: props?.onClose,
    onOpen: props?.onOpen,
  });

  if (!visible) {
    return null;
  }

  return (
    <Portal hostName={portalHostName}>
      <Animated.View
        accessibilityViewIsModal
        importantForAccessibility="yes"
        style={[styles.container, animatedBackgroundColorStyle]}
      >
        <Pressable
          disabled={!dismissOnTapOutside}
          style={styles.background}
          onPress={hideBottomSheet}
        />
        <Animated.View pointerEvents="auto" style={animatedSheetStyle}>
          <GestureDetector gesture={pan}>
            <Animated.View
              collapsable={false}
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
    </Portal>
  );
});

export default DynamicBottomSheet;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
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
