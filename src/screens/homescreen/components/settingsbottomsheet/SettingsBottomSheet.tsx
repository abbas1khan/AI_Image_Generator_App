import { StyleSheet, Text, View } from 'react-native';
import React, { forwardRef } from 'react';
import DynamicBottomSheet, {
  IDynamicBottomSheetRef,
} from '../../../../components/common/dynamicbottomsheet/DynamicBottomSheet';
import { HomeScreenStates } from '../../hooks/useHomeScreenStates';
import { fontFamily } from '../../../../constants/layout';
import { colors } from '../../../../constants/colors';
import DropDown from '../../../../components/common/dropdown/DropDown';
import { AI_MODELS } from '../../../../constants/aimodels';
import StyleList from './components/StyleList';
import { isAndroid } from '../../../../constants/appConstants';

interface SettingsBottomSheetProps {
  states: HomeScreenStates;
}

const SettingsBottomSheet = forwardRef<
  IDynamicBottomSheetRef,
  SettingsBottomSheetProps
>(({ states }, ref) => {
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
      </View>
    </DynamicBottomSheet>
  );
});

export default SettingsBottomSheet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: isAndroid ? 60 : 40,
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
