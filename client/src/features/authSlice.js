import { createSlice } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';
// import jwtDecode from 'jwt-decode';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer

// export const initializeAuth = () => (dispatch) => {
//   // Check for existing session cookie on app startup
//   const sessionCookie = Cookies.get('session');
//   if (sessionCookie) {
//     // Make a request to validate the session or decode the JWT on the server-side
//     // If the session is valid, dispatch the login success action with user data
//     const user = jwtDecode(sessionCookie); // Implement your own decoding logic
//     dispatch(loginSuccess(user));
//   } else {
//     // If no session cookie exists, dispatch the logout action to clear the authentication state
//     dispatch(logout());
//   }
// };