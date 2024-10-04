import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {authenticateBiometric} from '../../services/Biometric.service';
import {AUTH_NAV, BIOMETRIC_TYPE} from '../../constant/authentication.constant';
import {TASK_NAV} from '../../constant/task.constant';
import {handleLoginUserAction} from '../../saga/authentication.saga';
import {backgroundStyle} from '../Navigation';
import Colors from '../../assets/Colors';
import CustomButton from '../../component/CustomButton';
import InputWithLabel from '../../component/InputWithLabel';
import {
  passwordValidation,
  usernameValidation,
} from '../../services/Validation.service';
import Icons from '../../assets/Icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {isTokenExpired} from '../../services/Token.service';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const biometryType = useSelector((state: any) => state.auth.biometryType);
  const user = useSelector((state: any) => state.auth.user);
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(user !== null);
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);

  const labelList = {
    title: 'Welcome back',
    userName: 'User Name',
    password: 'Password',
    loginBtn: 'Login',
    googleLogin: 'Google',
    registerDesc: "Don't have an account yet? ",
    registerBtn: 'Register',
    invalidUsername: 'Invalid username',
    invalidPassword: 'Invalid password',
  };

  const testID = {
    inputUserName: 'input-userName',
    inputPassword: 'input-password',
    loginBtn: 'login-button',
    googleLoginBtn: 'google-login-button',
    registerBtn: 'register-button',
  };

  useEffect(() => {
    if (isAuth || user) {
      navigation.navigate(TASK_NAV.HOME);
    }
  }, [isAuth, user]);

  // useEffect(() => {
  //   // Call function immediately
  //   isTokenExpired(accessToken);

  //   // Set up the interval to call the function every 5 minutes
  //   const intervalId = setInterval(
  //     () => setIsAuth(!isTokenExpired(accessToken)),
  //     1000,
  //   ); // 300,000 ms = 5 minutes

  //   // Clear the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);
  const onPressLogin = () => {
    dispatch(handleLoginUserAction({user: {userName, password}}));
    navigation.navigate(TASK_NAV.HOME);
  };

  const onPressAuth = async () => {
    setIsAuth(await authenticateBiometric());
  };

  const iconName = () => {
    if (biometryType === BIOMETRIC_TYPE.FACE_ID) return Icons.FACE_RECOGNITION;
    else return Icons.FINGERPRINT;
  };

  const isDisableNext =
    !usernameValidation(userName) || !passwordValidation(password);

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/pets_formal.png')}
        />
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
          onChangeText={setPassword}
          testId={testID.inputPassword}
          secureTextEntry={passwordSecureTextEntry}
          onPressEyeIcon={() =>
            setPasswordSecureTextEntry(!passwordSecureTextEntry)
          }
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            label={labelList.loginBtn}
            onPressButton={onPressLogin}
            testId={testID.loginBtn}
            buttonWidth={70}
            isDisableNext={isDisableNext}
          />
          {biometryType !== null && (
            <TouchableOpacity onPress={onPressAuth} style={{marginLeft: '7%'}}>
              <Icon name={iconName()} size={40} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Text>{labelList.registerDesc}</Text>
          <TouchableOpacity
            testID={testID.registerBtn}
            onPress={() => {
              navigation.navigate(AUTH_NAV.REGISTRATION);
            }}>
            <Text style={{color: Colors.hyperlink}}>
              {labelList.registerBtn}
            </Text>
          </TouchableOpacity>
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
  logo: {
    width: 250,
    height: 250,
    borderRadius: 50,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    padding: '5%',
  },
  input: {
    height: 40,
    marginVertical: '3%',
    padding: '3%',
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  statusContainer: {
    margin: '5%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: '3%',
  },
  buttonInnerContainer: {
    borderRadius: 10,
    width: '70%',
  },
});
export default Login;
