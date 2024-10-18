import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Platform,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Colors from '../assets/Colors';

interface CustomButtonProps {
  label: string;
  onPressButton: () => void;
  testId: string;
  isDisableNext?: boolean;
  buttonWidth?: number;
  /* style - Add on your own risk */
  style?: StyleProp<ViewStyle>;
}
const CustomButton = (props: CustomButtonProps) => {
  const {
    label,
    onPressButton,
    testId,
    isDisableNext = false,
    buttonWidth = 45,
    style,
  } = props;

  return (
    <View
      style={
        style ?? [
          {
            ...styles.buttonInnerContainer,
            backgroundColor: isDisableNext
              ? Colors.disableButton
              : Colors.button,
            width: `${buttonWidth}%`,
          },
        ]
      }>
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
    marginHorizontal: '3%',
    marginVertical: '2%',
  },
});

export default CustomButton;
