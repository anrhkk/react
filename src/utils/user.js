import jwt_decode from 'jwt-decode';
import { getToken } from './func';
export const getUserProfile = (token) => {
  try {
    const userProfile = jwt_decode(token);
    const now = new Date().getTime() / 1000;   // Date().getTime() returns milliseconds.
    if (now > userProfile.exp) {// user profile has expired.
      return null;
    }
    return userProfile;
  } catch (err) {
    return null;
  }
};

export const getUserId = () => {
  let userProfile = getUserProfile(getToken());
  if (userProfile) {
    return userProfile.uid;
  }else{
    return 0;
  }
};

export const redirectToBack = (nextState, replace) => {
  //已经登录则不进入
  if (window && getUserProfile(getToken())) {
    replace('/');
  }
};

export const redirectToLogin = (nextState,replace) => {
  if (window && !getUserProfile(getToken())) {
    replace('/login');
  }
};