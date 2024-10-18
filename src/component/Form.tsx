import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {backgroundStyle} from '../navigation/Navigation';
import InputWithLabel from './InputWithLabel';
import CustomButton from './CustomButton';
import useTokenCounter from './useTokenCounter';
import {goBack} from '../services/Navigation.service';
import {isNullOrEmpty} from '../services/Validation.service';

interface FormProp {
  headerLabel: string;
  btnLabel: string;
  item: Array<{
    state: string;
    setState: Dispatch<SetStateAction<string>>;
    label: string;
    isMultiline?: boolean;
    keyboardType?: KeyboardTypeOptions;
    inlineMessage?: string;
  }>;
  other?: React.JSX.Element;
  onPressSubmitItem: () => void;
  extraDisableCondition?: boolean;
}

const Form = (props: FormProp) => {
  const {
    headerLabel,
    btnLabel,
    item,
    other,
    onPressSubmitItem,
    extraDisableCondition,
  } = props;
  const [shouldStopCounter, setShouldStopCounter] = useState(false);

  useTokenCounter(shouldStopCounter);
  const labelList = {
    backBtn: 'Back',
  };

  const testID = {
    input: 'input-{item}',
    backBtn: 'back-button',
    submitBtn: 'submit-button',
  };

  const submitItem = () => {
    setShouldStopCounter(true);
    onPressSubmitItem();
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{headerLabel}</Text>
        {item.map((i: any) => {
          const testIDInput = testID.input.replace('{item}', i.label);

          return (
            <InputWithLabel
              id={`${headerLabel}-${testIDInput}`}
              placeholder={i.label}
              label={i.label}
              value={i.state}
              onChangeText={i.setState}
              testId={testIDInput}
              isMultiline={i?.isMultiline ?? false}
              keyboardType={i.keyboardType}
              inlineMessage={i.inlineMessage}
            />
          );
        })}

        {other}

        <View style={styles.buttonContainer}>
          <CustomButton
            label={labelList.backBtn}
            onPressButton={() => {
              setShouldStopCounter(true);
              goBack();
            }}
            testId={testID.backBtn}
          />
          <CustomButton
            label={btnLabel}
            onPressButton={submitItem}
            testId={testID.submitBtn}
            isDisableNext={
              item.some(i => isNullOrEmpty(i.state)) || extraDisableCondition
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: '7%',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    paddingBottom: '3%',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
export default Form;
