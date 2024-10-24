import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputWithLabel from '../../component/InputWithLabel';
import {
  emailValidation,
  passwordValidation,
} from '../../services/Validation.service';
import {useDispatch} from 'react-redux';
import {registerNewUserAction} from '../../saga/authentication.saga';
import Form from '../../component/Form';

const Registration = () => {
  const dispatch = useDispatch();
  const [firstName, setFirtName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const [
    confirmedPasswordSecureTextEntry,
    setConfirmedPasswordSecureTextEntry,
  ] = useState(true);

  const isDisableNext =
    !emailValidation(email) ||
    !passwordValidation(password) ||
    !passwordValidation(confirmedPassword);

  const labelList = {
    title: 'User Registration',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    confirmedPassword: 'Confirmed Password',
    backBtn: 'Back',
    registerBtn: 'Register',
    invalidEmail: 'Invalid email',
    invalidPassword: 'Invalid password',
    passwordValidationTitle: 'Password Criteria',
    passwordValidationDesc:
      '1. Minimum Length: At least 8 characters.\n2. Uppercase Letters: At least one uppercase letter (A-Z).\n3. Lowercase Letters: At least one lowercase letter (a-z).\n4. Digits: At least one digit (0-9).\n5. Special Characters: At least one special character (e.g., !@#$%^&*).',
  };

  const testID = {
    inputPassword: 'register-input-password',
    inputConfirmedPassword: 'register-input-confirmed-password',
  };

  const onPressRegister = () => {
    dispatch(
      registerNewUserAction({user: {email, password, firstName, lastName}}),
    );
  };

  return (
    <Form
      headerLabel={labelList.title}
      btnLabel={labelList.registerBtn}
      item={[
        {
          state: firstName,
          setState: setFirtName,
          label: labelList.firstName,
        },
        {
          state: lastName,
          setState: setLastName,
          label: labelList.lastName,
        },
        {
          state: email,
          setState: setEmail,
          label: labelList.email,
          inlineMessage: !emailValidation(email)
            ? labelList.invalidEmail
            : undefined,
        },
      ]}
      other={
        <>
          <InputWithLabel
            placeholder={labelList.password}
            label={labelList.password}
            inlineMessage={
              !passwordValidation(password)
                ? labelList.invalidPassword
                : undefined
            }
            value={password}
            onChangeText={v => {
              setPassword(v);
              setConfirmedPassword('');
            }}
            testId={testID.inputPassword}
            secureTextEntry={passwordSecureTextEntry}
            onPressEyeIcon={() =>
              setPasswordSecureTextEntry(!passwordSecureTextEntry)
            }
          />
          <InputWithLabel
            placeholder={labelList.confirmedPassword}
            label={labelList.confirmedPassword}
            inlineMessage={
              !passwordValidation(confirmedPassword) ||
              password !== confirmedPassword
                ? labelList.invalidPassword
                : undefined
            }
            value={confirmedPassword}
            onChangeText={setConfirmedPassword}
            testId={testID.inputConfirmedPassword}
            secureTextEntry={confirmedPasswordSecureTextEntry}
            onPressEyeIcon={() =>
              setConfirmedPasswordSecureTextEntry(
                !confirmedPasswordSecureTextEntry,
              )
            }
          />
        </>
      }
      onPressSubmitItem={onPressRegister}
      extraDisableCondition={isDisableNext}
      bottomNote={
        <View style={styles.validationContainer}>
          <Text style={styles.validationTitle}>
            {labelList.passwordValidationTitle}
          </Text>
          <Text>{labelList.passwordValidationDesc}</Text>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    paddingBottom: '3%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: '3%',
  },
  validationContainer: {
    padding: '3%',
    margin: '3%',
    borderRadius: 20,
    borderWidth: 1,
  },
  validationTitle: {
    fontWeight: 'bold',
    paddingTop: '1%',
  },
});
export default Registration;
