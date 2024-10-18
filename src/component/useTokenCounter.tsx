import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux'; // Assuming you're using Redux for state management
import {AUTH_NAV} from '../constant/authentication.constant';
import {handleLogoutUserAction} from '../saga/authentication.saga';
import {navigate} from '../services/Navigation.service';
import {
  alertAccessTokenExpired,
  isTokenExpired,
  tokenExpiredAction,
} from '../services/Token.service';
import {isNullOrEmpty} from '../services/Validation.service';

const useTokenCounter = (shouldStop: boolean) => {
  const refreshId: any = useRef(null);
  const dispatch = useDispatch();
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  const logout = () => {
    dispatch(handleLogoutUserAction());
  };

  const startCounter = () => {
    refreshId.current = setInterval(() => {
      if (isTokenExpired(accessToken)) {
        alertAccessTokenExpired();
        stopCounter();
      } else if (isTokenExpired(refreshToken)) {
        return logout();
      }
    }, 180000);
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
    if (!isNullOrEmpty(action.type)) {
      dispatch(action);
    } else {
      action.type !== handleLogoutUserAction.type && startCounter();
    }
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
