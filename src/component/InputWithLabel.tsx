import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from '../assets/Icons';

interface InputWithLabelProps {
  label: string;
  placeholder: string;
  inlineMessage?: string;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  testId: string;
  isMultiline?: boolean;
  secureTextEntry?: boolean;
  onPressEyeIcon?: () => void;
}
const InputWithLabel = (props: InputWithLabelProps) => {
  const {
    label,
    placeholder,
    inlineMessage,
    value,
    onChangeText,
    testId,
    isMultiline = false,
    secureTextEntry = false,
    onPressEyeIcon,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, {height: isMultiline ? 100 : undefined}]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          testID={testId}
          multiline={isMultiline}
          secureTextEntry={secureTextEntry}
          autoCapitalize={'none'}
        />
        {value && onPressEyeIcon && (
          <TouchableOpacity
            onPress={onPressEyeIcon}
            style={styles.iconContainer}>
            <Icon
              name={secureTextEntry ? Icons.EYE_OFF : Icons.EYE}
              size={25}
            />
          </TouchableOpacity>
        )}
      </View>
      {value && inlineMessage ? (
        <Text style={styles.inlineMessage}>{inlineMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginTop: '1%',
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 8,
    marginVertical: '3%',
  },
  input: {
    height: 40,
    padding: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  iconContainer: {
    marginLeft: '7%',
    alignSelf: 'center',
  },
  inlineMessage: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default InputWithLabel;
