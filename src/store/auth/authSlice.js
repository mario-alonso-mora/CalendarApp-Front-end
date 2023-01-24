
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({

    name: 'auth',
    initialState: {
        
        status:'checking',
        user: {},
        errorMessage:undefined,

    },
    reducers: {


        OnChecking: (state ) => {

         state.checking = 'checking';
         state.user = {},
         state.errorMessage = undefined

        },

        OnLogin: (state, {payload} ) => {

            state.status = 'authenticated';
            state.user = payload,
            state.errorMessage = undefined
            
   
           },

           OnLogOut: (state, {payload} ) => {

            state.status = 'not-authenticated';
            state.user = {},
            state.errorMessage = payload
   
           },

           cleanErrorMessage: (state) => {

            
            state.errorMessage = undefined;
   
           },

    }

  });

// Action creators are generated for each case reducer function
export const { OnChecking,OnLogin,OnLogOut,cleanErrorMessage } = authSlice.actions;