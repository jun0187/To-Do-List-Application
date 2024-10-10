import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useRef} from 'react';
import {Alert} from 'react-native'; // Adjust if you're using a different alert system
import {useDispatch, useSelector} from 'react-redux'; // Assuming you're using Redux for state management
import {AUTH_NAV} from '../constant/authentication.constant';
import {
  getNewAccessTokenAction,
  handleLogoutUserAction,
} from '../saga/authentication.saga';
import {useNavigation} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token: string) => {
  try {
    const tokenExpTime = jwtDecode(token).exp;
    if (tokenExpTime === undefined) {
      return false; // Token doesn't have exp claim
    }
    const currentTime = Date.now() / 1000; // Current time in seconds
    console.log('Current time::', currentTime);
    console.log('tokenExpTime::', tokenExpTime, tokenExpTime < currentTime);
    return tokenExpTime < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // If there's an error, assume expired
  }
};

const useTokenCounter = (shouldStop: boolean) => {
  const refreshId: any = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  const labelList = {
    alertTitle: 'Idle for long time',
    alertDesc: 'Do you wish to logout or continue?',
    alertLogoutBtn: 'Logout',
    alertContinueBtn: 'Continue',
  };
  const logout = () => {
    dispatch(handleLogoutUserAction());
  };

  const startCounter = () => {
    refreshId.current = setInterval(() => {
      if (isTokenExpired(accessToken)) {
        Alert.alert(labelList.alertTitle, labelList.alertDesc, [
          {
            text: labelList.alertLogoutBtn,
            onPress: logout,
            style: 'cancel',
          },
          {
            text: labelList.alertContinueBtn,
            onPress: async () => {
              await dispatch(getNewAccessTokenAction()); // Await for completion
            },
          },
        ]);

        stopCounter();
      } else if (isTokenExpired(refreshToken)) {
        return logout();
      }
    }, 30000);
  };

  const stopCounter = () => {
    console.log('jhsdja');
    clearInterval(refreshId.current);
    refreshId.current = null;
  };

  useEffect(() => {
    if (shouldStop) {
      stopCounter();
      return;
    }

    if (!refreshToken) {
      navigation.navigate(AUTH_NAV.LOGIN);
      stopCounter();
      return;
    }

    if (isTokenExpired(refreshToken)) {
      return logout();
    }
    startCounter();

    // Cleanup on unmount
    return () => {
      stopCounter();
    };
  }, [accessToken, refreshToken, navigation, dispatch, shouldStop]);

  return {
    stopCounter,
  };
};

export default useTokenCounter;
