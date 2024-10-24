import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import InputWithLabel from './InputWithLabel';
import CustomButton from './CustomButton';
import useTokenCounter from './useTokenCounter';
import {goBack} from '../services/Navigation.service';
import {isNullOrEmpty} from '../services/Validation.service';
import StackContainer from './StackContainer';

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
  bottomNote?: React.JSX.Element;
}

const Form = (props: FormProp) => {
  const {
    headerLabel,
    btnLabel,
    item,
    other,
    onPressSubmitItem,
    extraDisableCondition,
    bottomNote,
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
    <StackContainer title={headerLabel}>
      {item.map((i: any, key) => {
        const testIDInput = testID.input.replace('{item}', i.label);

        return (
          <View key={key}>
            <InputWithLabel
              placeholder={i.label}
              label={i.label}
              value={i.state}
              onChangeText={i.setState}
              testId={testIDInput}
              isMultiline={i?.isMultiline ?? false}
              keyboardType={i.keyboardType}
              inlineMessage={i.inlineMessage}
            />
          </View>
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
      {bottomNote}
    </StackContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    // marginVertical: '7%',
    justifyContent: 'center',
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
