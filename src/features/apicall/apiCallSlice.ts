import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


import axios from 'axios';
import { PowerValuationDetailsModel } from './model';


//power valuation object representing backend object
//it has one column now called id



export interface PowerValuationDetails {

    powervaluationdetails: PowerValuationDetailsModel[];
    status: 'idle' | 'running' | 'failed' | 'loading' | 'success';

}


// initial state of the power valuation details object

const initialState: PowerValuationDetails = {

    powervaluationdetails: [],
    status: 'idle',

}


export const getPowerValuationDetailsAsync = createAsyncThunk(
  'powervaluation/fetchPowerValuation',
  async (obj, {dispatch}) => {


    const response = await axios.get<PowerValuationDetailsModel[]>('https://etrmsapiapp.herokuapp.com/valuation/api/GetValuationResult/')
    // The value we return becomes the `fulfilled` action payload
    //console.log(response.data);
    return response.data;
  }
);

//synchronous call 
export const apiSlice = createSlice({
    name: 'apicall',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      apicallaction: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.status = 'idle';
        //state.powervaluationdetails = [{id:20, trade:20}]
      },
      fromuseeffect: (state, action) =>{

        state.status = action.payload.status;
        state.powervaluationdetails = action.payload;

      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getPowerValuationDetailsAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getPowerValuationDetailsAsync.fulfilled, (state, action) => {
          state.status = 'success';
          state.powervaluationdetails = action.payload;
        })
        .addCase(getPowerValuationDetailsAsync.rejected, (state, action) => {
          state.status = 'failed';
        })
        
        ;
    },
  });



  export const { apicallaction, fromuseeffect } = apiSlice.actions;

  export const selectPowerValuationDetails = (state: RootState) =>  state.apicall.powervaluationdetails;
  export const selectStatus = (state: RootState) => state.apicall.status;



export default apiSlice.reducer;