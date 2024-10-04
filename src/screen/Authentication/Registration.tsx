import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {backgroundStyle} from '../Navigation';
import InputWithLabel from '../../component/InputWithLabel';
import CustomButton from '../../component/CustomButton';
import {
  passwordValidation,
  usernameValidation,
} from '../../services/Validation.service';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Registration = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const [
    confirmedPasswordSecureTextEntry,
    setConfirmedPasswordSecureTextEntry,
  ] = useState(true);

  const isDisableNext =
    !usernameValidation(userName) ||
    !passwordValidation(password) ||
    !passwordValidation(confirmedPassword);

  const labelList = {
    title: 'User Registration',
    userName: 'Username',
    password: 'Password',
    confirmedPassword: 'Confirmed Password',
    backBtn: 'Back',
    googleLogin: 'Google',
    registerDesc: "Don't have an account already? ",
    registerBtn: 'Register',
    invalidUsername: 'Invalid username',
    invalidPassword: 'Invalid password',
    usernameValidationTitle: 'Username Criteria',
    usernameValidationDesc:
      '1. 5 to 20 characters long\n2. Contains only letters, numbers, and underscores\n3. Has no leading or trailing spaces',
    passwordValidationTitle: 'Password Criteria',
    passwordValidationDesc:
      '1. Minimum Length: At least 8 characters.\n2. Uppercase Letters: At least one uppercase letter (A-Z).\n3. Lowercase Letters: At least one lowercase letter (a-z).\n4. Digits: At least one digit (0-9).\n5. Special Characters: At least one special character (e.g., !@#$%^&*).',
  };

  const testID = {
    inputUserName: 'input-userName',
    inputPassword: 'input-password',
    inputConfirmedPassword: 'input-confirmed-password',
    backBtn: 'back-button',
    googleLoginBtn: 'google-login-button',
    registerBtn: 'register-button',
  };

  const onPressRegister = () => {
    // const taskItem: TaskModel = {
    //   title,
    //   description,
    //   id,
    //   status: status ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING,
    // };
    // const updatedTaskList = [...taskList, taskItem];
    // dispatch(savedTaskAction({taskList: updatedTaskList}));
    // navigation.navigate(TASK_NAV.HOME);
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{labelList.title}</Text>
        <InputWithLabel
          placeholder={labelList.userName}
          label={labelList.userName}
          inlineMessage={
            !usernameValidation(userName)
              ? labelList.invalidUsername
              : undefined
          }
          value={userName}
          onChangeText={setUserName}
          testId={testID.inputUserName}
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
            {labelList.usernameValidationTitle}
          </Text>
          <Text>{labelList.usernameValidationDesc}</Text>
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
    paddingBottom: '20%',
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
