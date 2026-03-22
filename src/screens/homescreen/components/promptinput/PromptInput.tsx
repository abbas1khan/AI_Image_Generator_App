import { StyleSheet, TextInput, View } from 'react-native';
import React, { FC, useState } from 'react';
import { colors, gradientColors } from '../../../../constants/colors';
import { fontFamily } from '../../../../constants/layout';
import { KeyboardController } from 'react-native-keyboard-controller';
import GradientBorderView from '../../../../components/common/gradientborderview/GradientBorderView';
import GenerateButton from '../generatebutton/GenerateButton';

type PromptInputProps = {
  isGenerating: boolean;
  onSettingPress: () => void;
  onGeneratePress: (prompt: string) => void;
};

const PromptInput: FC<PromptInputProps> = ({
  isGenerating,
  onSettingPress,
  onGeneratePress,
}) => {
  const [prompt, setPrompt] = useState<string>('');

  const handlePromptChange = (text: string) => {
    setPrompt(text);
  };

  const handleSettingPress = () => {
    KeyboardController.dismiss({ animated: true });
    onSettingPress();
  };

  const handleGenerate = () => {
    if (!prompt?.trim()) return;

    KeyboardController.dismiss({ animated: true });
    onGeneratePress(prompt?.trim());
  };

  return (
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
  );
};

export default PromptInput;

const styles = StyleSheet.create({
  gradientContainer: {
    borderWidth: 2,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.sheetBackground,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  gradientInnerContainer: {
    overflow: 'hidden',
  },
  container: {
    paddingBottom: 16,
  },
  inputContainer: {
    paddingVertical: 12,
  },
  input: {
    paddingHorizontal: 18,
    color: colors.textPrimary,
    fontSize: 16,
    maxHeight: 107,
    fontFamily: fontFamily.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
