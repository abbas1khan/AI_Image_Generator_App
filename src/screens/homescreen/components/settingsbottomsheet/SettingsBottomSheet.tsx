import { StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback } from 'react';
import DynamicBottomSheet, {
  IDynamicBottomSheetRef,
} from '../../../../components/dynamicbottomsheet/DynamicBottomSheet';
import { HomeScreenStates } from '../../hooks/useHomeScreenStates';
import { fontFamily } from '../../../../constants/layout';
import { colors } from '../../../../constants/colors';
import DropDown from '../../../../components/dropdown/DropDown';
import { AI_MODELS } from '../../../../constants/aimodels';
import StyleList from './components/StyleList';
import { isAndroid } from '../../../../constants/appConstants';
import RatioList from './components/ratiolist/RatioList';
import { IAspectRatio } from '../../../../constants/aspectRatio';

interface SettingsBottomSheetProps {
  states: HomeScreenStates;
}

const SettingsBottomSheet = forwardRef<
  IDynamicBottomSheetRef,
  SettingsBottomSheetProps
>(({ states }, ref) => {
  const handleRatioPress = useCallback(
    (ratio: IAspectRatio) => {
      states.setAspectRatio(ratio);
      if (states.isError) {
        states.setIsError(false);
      }
    },
    [states.isError],
  );

  return (
    <DynamicBottomSheet ref={ref}>
      <View style={styles.container}>
        <View style={styles.dragKnob} />

        <Text style={styles.title}>Generation settings</Text>

        <Text style={styles.sectionLabel}>MODEL</Text>

        <DropDown
          selectedData={states.selectedModel}
          allData={AI_MODELS}
          setSelectedData={states.setSelectedModel}
        />

        <Text style={styles.sectionLabel}>STYLE</Text>

        <StyleList
          selectedStyle={states.selectedStylePreset}
          onPress={states.setSelectedStylePreset}
        />

        <Text style={styles.sectionLabel}>ASPECT RATIO</Text>

        <RatioList
          selectedRatio={states.aspectRatio}
          onPress={handleRatioPress}
        />
      </View>
    </DynamicBottomSheet>
  );
});

export default React.memo(SettingsBottomSheet);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: isAndroid ? 70 : 50,
  },
  dragKnob: {
    width: 45,
    height: 4,
    backgroundColor: colors.borderElevated,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: fontFamily.bold,
    letterSpacing: 3,
    marginTop: 20,
    marginBottom: 8,
  },
});
