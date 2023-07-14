import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import {
  getLocalUser,
  setLocalUser,
  removeLocalUser,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  user: getLocalUser(),
  isSidebarOpen: false,
  name: "",
  email: "",
  password: "",
  isMember: false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);

      return resp.data;
    } catch (error) {
      if (error.response.status === 401) console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      console.log(resp);
      return resp.data.user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },

    toggleMember: (state) => {
      state.isMember = !state.isMember;
    },

    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    logoutUser: (state) => {
      state.user = null;
      removeLocalUser();
      state.isSidebarOpen = false;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      toast.success("user successfully registered");
      setLocalUser(user);
      state.isLoading = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      toast.success(`Welcome, ${payload.name}`);
      setLocalUser(state.user);
      state.isLoading = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [editUser.pending]: (state) => {
      state.isLoading = true;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.isLoading = false;
    },
    [editUser.rejected]: (state, { payload }) => {
      if (payload === "Authentication Invalid") {
        toast.error("server shat itself please login again");
        removeLocalUser();
        state.user = null;
      }
      state.isLoading = false;
    },
  },
});

export const {
  handleChange,
  handleSubmit,
  toggleMember,
  toggleSidebar,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
