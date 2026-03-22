import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface AccordionRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
}

export interface AccordionProps {
  renderHeader: () => React.ReactNode;
  renderBody: () => React.ReactNode;
  onToggle?: (isOpen: boolean) => void;
  duration?: number;
  enableHeaderToggle?: boolean;
}

export const Accordion = forwardRef<AccordionRef, AccordionProps>(
  function Accordion(
    {
      renderHeader,
      renderBody,
      onToggle,
      duration = 300,
      enableHeaderToggle = true,
    },
    ref,
  ) {
    const height = useSharedValue(0);
    const animatedHeight = useSharedValue(0);
    const isOpenValue = useSharedValue(false);

    const handleLayout = useCallback(
      (e: LayoutChangeEvent) => {
        const heightValue = e?.nativeEvent?.layout?.height;
        if (heightValue) {
          height.value = heightValue;
        }
      },
      [height],
    );

    const animate = useCallback(
      (open: boolean) => {
        animatedHeight.value = withTiming(open ? height.value : 0, {
          duration,
        });
        isOpenValue.value = open;
        onToggle?.(open);
      },
      [duration, onToggle],
    );

    useImperativeHandle(ref, () => ({
      open: () => animate(true),
      close: () => animate(false),
      toggle: () => animate(!isOpenValue.value),
      isOpen: () => isOpenValue.value,
    }));

    const bodyStyle = useAnimatedStyle(() => ({
      height: animatedHeight.value,
    }));

    const handleHeaderPress = useCallback(() => {
      animate(!isOpenValue.value);
    }, [animate]);

    return (
      <View>
        <Pressable disabled={!enableHeaderToggle} onPress={handleHeaderPress}>
          {renderHeader()}
        </Pressable>
        <Animated.View style={[{ overflow: 'hidden' }, bodyStyle]}>
          <View onLayout={handleLayout} style={styles.body}>
            {renderBody()}
          </View>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    width: '100%',
  },
});
