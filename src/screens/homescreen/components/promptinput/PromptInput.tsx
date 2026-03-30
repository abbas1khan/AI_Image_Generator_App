import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { FC, useState } from 'react';
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

  const handlePromptChange = (text: string) => {
    setPrompt(text);
  };

  const handleSettingPress = () => {
    KeyboardController.dismiss({ animated: true });
    setOverlayVisible(false);
    onSettingPress();
  };

  const handleGenerate = () => {
    if (!prompt?.trim()) return;

    KeyboardController.dismiss({ animated: true });
    onGeneratePress(prompt?.trim());
  };

  const handleOverylayPress = () => {
    KeyboardController.dismiss({ animated: true });
  };

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
        <GradientBorderView
          colors={gradientColors.bottomSheet}
          style={styles.gradientContainer}
          innerContainerStyle={styles.gradientInnerContainer}
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
