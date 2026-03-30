import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, { FC, useCallback, useRef, useState } from 'react';
import { colors, gradientColors } from '../../../../constants/colors';
import { fontFamily } from '../../../../constants/layout';
import {
  KeyboardController,
  KeyboardStickyView,
  useKeyboardHandler,
} from 'react-native-keyboard-controller';
import GradientBorderView from '../../../../components/gradientborderview/GradientBorderView';
import GenerateButton from '../generatebutton/GenerateButton';
import {
  isAndroid,
  screenHeight,
  screenWidth,
} from '../../../../constants/appConstants';
import { scheduleOnRN } from 'react-native-worklets';
import Toast, {
  ToastRef,
  ToastVariant,
} from '../../../../components/toast/Toast';

type PromptInputProps = {
  isGenerating: boolean;
  onSettingPress: () => void;
  onGeneratePress: (prompt: string) => void;
};

const keyboardOffset = { closed: 0, opened: isAndroid ? 50 : 85 };

const PromptInput: FC<PromptInputProps> = ({
  isGenerating,
  onSettingPress,
  onGeneratePress,
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);

  const containerHeightRef = useRef<number>(0);
  const toastRef = useRef<ToastRef>(null);

  const handlePromptChange = (text: string) => {
    setPrompt(text);
  };

  const handleSettingPress = () => {
    KeyboardController.dismiss({ animated: true });
    setOverlayVisible(false);
    onSettingPress?.();
  };

  const handleGenerate = () => {
    if (!prompt?.trim()) {
      toastRef.current?.show({
        variant: ToastVariant.Warning,
        title: 'Enter a prompt',
        description: 'Please enter a prompt to generate an image.',
        duration: 2000,
        slideAnimationDuration: 250,
        zIndex: 1,
        verticalOffset: containerHeightRef.current + 16,
      });
      return;
    }

    KeyboardController.dismiss({ animated: true });
    onGeneratePress?.(prompt?.trim());
  };

  const handleOverylayPress = () => {
    KeyboardController.dismiss({ animated: true });
  };

  const handleContainerLayout = useCallback((e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height;
    if (height > 0) {
      containerHeightRef.current = height;
    }
  }, []);

  useKeyboardHandler(
    {
      onStart: (e) => {
        'worklet';
        const willKeyboardAppear = e.progress === 1;
        scheduleOnRN(setOverlayVisible, willKeyboardAppear);
      },
    },
    [],
  );

  return (
    <KeyboardStickyView offset={keyboardOffset}>
      <View>
        <Toast ref={toastRef} />

        <GradientBorderView
          colors={gradientColors.bottomSheet}
          style={styles.gradientContainer}
          innerContainerStyle={styles.gradientInnerContainer}
          onLayout={handleContainerLayout}
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Describe your imagination..."
                placeholderTextColor={colors.textMuted}
                value={prompt}
                multiline
                textAlignVertical="top"
                style={styles.input}
                onChangeText={handlePromptChange}
              />
            </View>

            <View style={styles.buttonContainer}>
              <GenerateButton
                isGenerating={isGenerating}
                onPress={handleSettingPress}
              />
              <GenerateButton
                isGenerating={isGenerating}
                onPress={handleGenerate}
              />
            </View>
          </View>
        </GradientBorderView>

        {overlayVisible ? (
          <Pressable
            onPress={handleOverylayPress}
            style={styles.backgroundOverlay}
          />
        ) : null}
      </View>
    </KeyboardStickyView>
  );
};

export default PromptInput;

const styles = StyleSheet.create({
  gradientContainer: {
    borderWidth: 2,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.sheetBackground,
    width: '100%',
    zIndex: 2,
  },
  gradientInnerContainer: {
    overflow: 'hidden',
  },
  container: {
    paddingBottom: 16,
  },
  inputContainer: {
    paddingVertical: isAndroid ? 12 : 18,
  },
  input: {
    paddingHorizontal: 18,
    color: colors.textPrimary,
    fontSize: 16,
    maxHeight: 120,
    fontFamily: fontFamily.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backgroundOverlay: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    bottom: '100%',
    zIndex: -1,
  },
});
