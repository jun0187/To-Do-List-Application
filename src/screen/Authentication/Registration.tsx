import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {backgroundStyle} from '../Navigation';
import InputWithLabel from '../../component/InputWithLabel';
import CustomButton from '../../component/CustomButton';
import {
  emailValidation,
  isNullOrEmpty,
  passwordValidation,
} from '../../services/Validation.service';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {registerNewUserAction} from '../../saga/authentication.saga';

const Registration = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
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
    inputFirstName: 'input-firstName',
    inputLastName: 'input-lastName',
    inputEmail: 'input-email',
    inputPassword: 'input-password',
    inputConfirmedPassword: 'input-confirmed-password',
    backBtn: 'back-button',
    googleLoginBtn: 'google-login-button',
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
          placeholder={labelList.firstName}
          label={labelList.firstName}
          value={firstName}
          onChangeText={setFirtName}
          testId={testID.inputFirstName}
        />
        <InputWithLabel
          placeholder={labelList.lastName}
          label={labelList.lastName}
          value={lastName}
          onChangeText={setLastName}
          testId={testID.inputLastName}
        />
        <InputWithLabel
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
        <View style={styles.buttonContainer}>
          <CustomButton
            label={labelList.backBtn}
            onPressButton={navigation.goBack}
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
