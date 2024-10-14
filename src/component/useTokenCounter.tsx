import {useEffect, useRef} from 'react';
import {Alert} from 'react-native'; // Adjust if you're using a different alert system
import {useDispatch, useSelector} from 'react-redux'; // Assuming you're using Redux for state management
import {AUTH_NAV} from '../constant/authentication.constant';
import {
  getNewAccessTokenAction,
  handleLogoutUserAction,
} from '../saga/authentication.saga';
import {navigate} from '../services/Navigation.service';
import {isTokenExpired, tokenExpiredAction} from '../services/Token.service';

const useTokenCounter = (shouldStop: boolean) => {
  const refreshId: any = useRef(null);
  const dispatch = useDispatch();
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
    clearInterval(refreshId.current);
    refreshId.current = null;
  };

  useEffect(() => {
    if (shouldStop) {
      stopCounter();
      return;
    }

    if (!refreshToken) {
      navigate(AUTH_NAV.LOGIN);
      stopCounter();
      return;
    }
    const action = tokenExpiredAction(accessToken, refreshToken);
    dispatch(action);
    action.type !== handleLogoutUserAction.type && startCounter();

    // Cleanup on unmount
    return () => {
      stopCounter();
    };
  }, [accessToken, refreshToken, navigate, dispatch, shouldStop]);

  return {
    stopCounter,
  };
};

export default useTokenCounter;
