import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {backgroundStyle} from '../../navigation/Navigation';
import InputWithLabel from '../../component/InputWithLabel';
import CustomButton from '../../component/CustomButton';
import {
  emailValidation,
  isNullOrEmpty,
  passwordValidation,
} from '../../services/Validation.service';
import {useDispatch} from 'react-redux';
import {registerNewUserAction} from '../../saga/authentication.saga';
import {goBack} from '../../services/Navigation.service';

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
    isNullOrEmpty(firstName) ||
    isNullOrEmpty(lastName) ||
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
    googleLogin: 'Google',
    registerDesc: "Don't have an account already? ",
    registerBtn: 'Register',
    invalidEmail: 'Invalid email',
    invalidPassword: 'Invalid password',
    passwordValidationTitle: 'Password Criteria',
    passwordValidationDesc:
      '1. Minimum Length: At least 8 characters.\n2. Uppercase Letters: At least one uppercase letter (A-Z).\n3. Lowercase Letters: At least one lowercase letter (a-z).\n4. Digits: At least one digit (0-9).\n5. Special Characters: At least one special character (e.g., !@#$%^&*).',
  };

  const testID = {
    inputFirstName: 'register-input-firstName',
    inputLastName: 'register-input-lastName',
    inputEmail: 'register-input-email',
    inputPassword: 'register-input-password',
    inputConfirmedPassword: 'register-input-confirmed-password',
    backBtn: 'register-back-button',
    registerBtn: 'register-button',
  };

  const onPressRegister = () => {
    dispatch(
      registerNewUserAction({user: {email, password, firstName, lastName}}),
    );
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{labelList.title}</Text>
        <InputWithLabel
          id={testID.inputFirstName}
          placeholder={labelList.firstName}
          label={labelList.firstName}
          value={firstName}
          onChangeText={setFirtName}
          testId={testID.inputFirstName}
        />
        <InputWithLabel
          id={testID.inputLastName}
          placeholder={labelList.lastName}
          label={labelList.lastName}
          value={lastName}
          onChangeText={setLastName}
          testId={testID.inputLastName}
        />
        <InputWithLabel
          id={testID.inputEmail}
          placeholder={labelList.email}
          label={labelList.email}
          inlineMessage={
            !emailValidation(email) ? labelList.invalidEmail : undefined
          }
          value={email}
          onChangeText={setEmail}
          testId={testID.inputEmail}
        />

        <InputWithLabel
          id={testID.inputPassword}
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
          id={testID.inputConfirmedPassword}
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
        <View style={styles.buttonContainer}>
          <CustomButton
            label={labelList.backBtn}
            onPressButton={goBack}
            testId={testID.backBtn}
          />
          <CustomButton
            label={labelList.registerBtn}
            onPressButton={onPressRegister}
            testId={testID.registerBtn}
            isDisableNext={isDisableNext}
          />
        </View>

        <View style={styles.validationContainer}>
          <Text style={styles.validationTitle}>
            {labelList.passwordValidationTitle}
          </Text>
          <Text>{labelList.passwordValidationDesc}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
  },
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
