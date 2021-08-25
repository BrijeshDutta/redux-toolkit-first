import { createAsyncThunk , createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";
import { User } from "./model";






export interface UserDetails {

    user: User;
    status: 'failed' | 'loading' | 'success' | 'idle';
    error: string | null

}

// initial state of the power valuation details object

const initialState: UserDetails = {

    user: {email: '', password: ''},
    status: 'idle',
    error: null


}

export const loginUser = createAsyncThunk(
    'user/login',
    async (userInput:User, {rejectWithValue, dispatch, getState}) =>{
    //     console.log('From the async method', userInput)
    // const response = await axios.post<User>('https://etrmsapiapp.herokuapp.com/api/auth/login/',userInput)
    // //   // The value we return becomes the `fulfilled` action payload
    // //   console.log('response ',response.data);
    // return response.data;
    
    dispatch(updatestatuswhileloading())


    try{
        const response = await axios.post<User>('https://etrmsapiapp.herokuapp.com/api/auth/login/',userInput)

        return response.data;

    } catch (err) {
        if(!err.response){
            throw err;
        }

        return rejectWithValue(err.response)

    }


    }
);

export const userRegister = createAsyncThunk(
  'user/register',
  async (userInput:User, {rejectWithValue}) =>{



  try{


      const response = await axios.post<User>('http://127.0.0.1:8000/api/auth/register/',userInput)

      return response.data;

  } catch (err) {
      if(!err.response){
          throw err;
      }

      return rejectWithValue(err.response)

  }


  }
);




//synchronous call 
export const loginSlice = createSlice({
    name: 'loginUser',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updatestatuswhileloading: (state) => {
            state.status = 'loading';
            console.log('Called from updatestatuswhileloading',state.status)
          }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.status = 'success';
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = 'failed';
          
          console.log('From rejected ',action.payload);

        })
        .addCase(userRegister.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(userRegister.fulfilled, (state, action) => {
          state.status = 'success';
          //state.user = action.payload;
        })
        .addCase(userRegister.rejected, (state, action) => {
          state.status = 'failed';
          //state.error = payload.error;
          
          console.log('From rejected ',action.payload);

        })
        
        ;
    },
  });



  export const { updatestatuswhileloading } = loginSlice.actions;

  export const selectUserDetails = (state: RootState) => state.loginUser.user;
  export const selectStatus = (state: RootState) => state.loginUser.status;


export default loginSlice.reducer;