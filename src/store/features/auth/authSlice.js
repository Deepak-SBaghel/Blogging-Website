import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // usere is not authenticated initialy
  userData: null, // userData.$id is the userId
};
const authSlice = createSlice({
  name: "auth",// this name is used in store 
  initialState,
  reducers: {
    // if u want to take the value , u use action.payload.text/etc
    // if u want to update the state , u use state
    
    // while calling the function , I am passing userData , it is extracted by action.payload.userData
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      console.log(state.status);
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// these login , logout indi
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
