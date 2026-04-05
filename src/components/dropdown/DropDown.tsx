import { StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import DropDownHeader from './components/DropDownHeader';
import DropDownBody from './components/DropDownBody';
import { IAIModel } from '../../constants/aimodels';

interface DropDownProps {
  selectedData: IAIModel;
  allData: IAIModel[];
  setSelectedData: (data: IAIModel) => void;
}

const DropDown: FC<DropDownProps> = ({
  selectedData,
  allData,
  setSelectedData,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredData = allData.filter(
    (item) => item.model !== selectedData.model,
  );

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelection = (item: IAIModel) => {
    setSelectedData(item);
    handleToggle();
  };

  return (
    <View style={styles.container}>
      <DropDownHeader
        isOpen={isOpen}
        onPress={handleToggle}
        selectedData={selectedData}
      />

      {isOpen ? (
        <DropDownBody allData={filteredData} onPress={handleSelection} />
      ) : null}
    </View>
  );
};

export default React.memo(DropDown);

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
});
