import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/axios";
import { toast } from "react-toastify";

import { clearState } from "../job/JobSlice";
import { logoutUser } from "../user/UserSlice";

export const getAllJobs = createAsyncThunk(
  "allJobs/getAllJobs",
  async (_, thunkAPI) => {
    const { searchStatus, searchType, sort, page, search } =
      thunkAPI.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search !== "") url = `${url}&search=${search}`;
    try {
      const resp = await customFetch.get(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const clearStore = createAsyncThunk(
  "allJobs/clearStore",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(logoutUser());
      thunkAPI.dispatch(resetState());
      thunkAPI.dispatch(clearState());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const getStats = createAsyncThunk(
  "allJobs/getStats",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/jobs/stats");

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: null,
  defaultStats: null,
  monthlyApplications: null,
  numOfPages: 1,
  totalJobs: 1,
  page: 1,
  ...initialFiltersState,
};

const AllJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    resetState: (state, _) => {
      return { ...initialState };
    },
    updateFilters: (state, { payload }) => {
      const { key, value } = payload;
      state[key] = value;
      state.page = 1;
    },
    clearFilters: (state) => {
      return {
        ...state,
        ...initialFiltersState,
      };
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    updatePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.jobs = payload.jobs;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
      state.isLoading = false;
    },
    [getAllJobs.pending]: (state, { payload }) => {
      toast.error(payload);
      state.isLoading = false;
    },
    [getStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getStats.fulfilled]: (state, { payload }) => {
      const { defaultStats, monthlyApplications } = payload;

      state.defaultStats = defaultStats;
      state.monthlyApplications = monthlyApplications;
      state.isLoading = false;
    },
    [getStats.pending]: (state, { payload }) => {
      toast.error(payload);
      state.isLoading = false;
    },
  },
});

export default AllJobsSlice.reducer;
export const {
  resetState,
  updateFilters,
  clearFilters,
  showLoading,
  updatePage,
} = AllJobsSlice.actions;
