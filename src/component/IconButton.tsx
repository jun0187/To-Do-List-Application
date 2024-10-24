import React from 'react';
import {StyleSheet, ViewStyle, StyleProp, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
  iconName: string;
  onPress: () => void;
  testId: string;
  iconSize?: number;
  /* style - Add on your own risk */
  style?: StyleProp<ViewStyle>;
}
const IconButton = (props: IconButtonProps) => {
  const {iconName, iconSize, onPress, testId, style} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      testID={testId}
      style={[style, styles.container]}>
      <Icon name={iconName} size={iconSize ?? 40} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;
