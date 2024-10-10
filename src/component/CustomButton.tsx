import React from 'react';
import {View, StyleSheet, Button, Platform} from 'react-native';
import Colors from '../assets/Colors';

interface CustomButtonProps {
  label: string;
  onPressButton: () => void;
  testId: string;
  isDisableNext?: boolean;
  buttonWidth?: number;
}
const CustomButton = (props: CustomButtonProps) => {
  const {
    label,
    onPressButton,
    testId,
    isDisableNext = false,
    buttonWidth = 45,
  } = props;

  return (
    <View
      style={[
        {
          ...styles.buttonInnerContainer,
          backgroundColor: isDisableNext ? Colors.disableButton : Colors.button,
          width: `${buttonWidth}%`,
        },
      ]}>
      <Button
        testID={testId}
        title={label}
        onPress={onPressButton}
        color={Platform.OS === 'ios' ? Colors.white : Colors.button}
        disabled={isDisableNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonInnerContainer: {
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 3,
  },
});

export default CustomButton;
