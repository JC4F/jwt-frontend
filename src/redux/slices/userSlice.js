import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchAllUsers = createAsyncThunk(
//   "users/fetchAllUsers",
//   async () => {
//     const response = await axios.get("http://localhost:8080/users/all");
//     return response.data;
//   }
// );

const initialState1 = {
  isLoading: true,
  isAuthenticated: false,
  token: "",
  account: {}
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialState1,
  reducers: {
    loginContext: (state, action) => {
      let stateTmp = {...action.payload, isLoading: false}
      Object.entries(stateTmp).forEach(([k, v]) => {
        state[k] = v;
      })
    },
    logoutContext: (state) => {
      let stateTmp = {...initialState1, isLoading: false}
      Object.entries(stateTmp).forEach(([k, v]) => {
        state[k] = v;
      })
    },
    // fetchData: (userData)=>{

    // }
  },
  extraReducers: (builder) => {
    // // Add reducers for additional action types here, and handle loading state as needed
    // builder
    // .addCase(fetchAllUsers.pending, (state, action) => {
    //   // Add user to the state array
    //   state.isLoading = true;
    //   state.isError = false;
    // })
    // .addCase(fetchAllUsers.fulfilled, (state, action) => {
    //   // Add user to the state array
    //   state.listUsers = action.payload;
    //   state.isLoading = false;
    //   state.isError = false;
    // })
    // .addCase(fetchAllUsers.rejected, (state, action) => {
    //   // Add user to the state array
    //   state.isLoading = false;
    //   state.isError = true;
    // })
    // ;
  },
});

// Action creators are generated for each case reducer function
export const { loginContext, logoutContext } = userSlice.actions;

export default userSlice.reducer;
