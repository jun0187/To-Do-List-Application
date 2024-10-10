import TouchID from 'react-native-touch-id';
import {Alert} from 'react-native';
// @ts-ignore
import PasscodeAuth from '@el173/react-native-passcode-auth';
import Colors from '../assets/Colors';

export const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: Colors.red, // Android
  imageErrorColor: Colors.red, // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Try Again', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

export const getBiometricType = async () => {
  return await TouchID.isSupported(optionalConfigObject)
    .then(biometryType => {
      return biometryType;
    })
    .catch(error => {
      Alert.alert('Error::', error.message);
      return null;
    });
};

export const authenticateBiometric = async () => {
  return await TouchID.authenticate('Authentication', optionalConfigObject)
    .then((success: any) => {
      return success;
    })
    .catch(async (error: any) => {
      if (error.name === 'LAErrorUserFallback') {
        return await passCodeAuth();
      }
      if (error.name !== 'LAErrorUserCancel') {
        Alert.alert('Biometric Error: ', error.message);
      }
      return false;
    });
};

export const passCodeAuth = async () => {
  return await PasscodeAuth.authenticate('PassCode Auth')
    .then((success: any) => {
      return success;
    })
    .catch((error: any) => {
      if (error.message !== 'LAErrorUserCancel') {
        Alert.alert('PassCode Error: ', error.message);
      }
      return false;
    });
};
