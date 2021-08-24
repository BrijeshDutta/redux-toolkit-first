import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
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
    async (userInput:User) =>{
        console.log('From the async method', userInput)
    const response = await axios.post<User>('https://etrmsapiapp.herokuapp.com/api/auth/login/',userInput)
    //   // The value we return becomes the `fulfilled` action payload
    //   console.log('response ',response.data);
    return response.data;



    }
);


//synchronous call 
export const loginSlice = createSlice({
    name: 'loginUser',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
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
        
        ;
    },
  });



  export const {  } = loginSlice.actions;

  export const selectUserDetails = (state: RootState) => state.loginUser.user;
  export const selectStatus = (state: RootState) => state.loginUser.status;


export default loginSlice.reducer;