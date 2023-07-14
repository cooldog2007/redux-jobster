import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/axios";
import { toast } from "react-toastify";
import { logoutUser } from "../user/UserSlice";
import { getAllJobs } from "../allJobs/AllJobsSlice";

const initialState = {
  isLoading: false,
  isEditing: false,
  _id: "",
};

export const addJob = createAsyncThunk("job/addJob", async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job);

    return resp.data;
  } catch (error) {
    if (error.request.status === 401) {
      toast.error("server shidded please login again");
      thunkAPI.dispatch(logoutUser());
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const editJob = createAsyncThunk(
  "job/editJob",
  async (job, thunkAPI) => {
    try {
      const resp = await customFetch.patch(
        `/jobs/${thunkAPI.getState().job._id}`,
        job
      );

      return resp.data;
    } catch (error) {
      if (error.request.status === 401) {
        toast.error("server shidded please login again");
        thunkAPI.dispatch(logoutUser());
      }

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "/job/deleteJob",
  async (id, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/jobs/${id}`);
      thunkAPI.dispatch(getAllJobs());
      return resp.data;
    } catch (error) {
      if (error.request.status === 401) {
        toast.error("server shidded please login again");
        thunkAPI.dispatch(logoutUser());
      }
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    enableEditing: (state, { payload }) => {
      state.isEditing = true;
      state._id = payload;
    },
    disableEditing: (state, _) => {
      state.isEditing = false;
    },
    clearState: (state) => {
      return {
        ...initialState,
      };
    },
  },

  extraReducers: {
    [addJob.pending]: (state) => {
      state.isLoading = true;
    },
    [addJob.fulfilled]: (state) => {
      toast.success("Added job");
      state.isLoading = false;
    },
    [addJob.rejected]: (state, { payload }) => {
      toast.error(payload);
      state.isLoading = false;
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state) => {
      toast.success("Job edited");
      state.isLoading = false;
    },
    [editJob.rejected]: (state, { payload }) => {
      toast.error(payload);
      state.isLoading = false;
    },
    [deleteJob.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteJob.fulfilled]: (state) => {
      toast.success("Done and dusted");
      state.isLoading = false;
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
      state.isLoading = false;
    },
  },
});

export default JobSlice.reducer;
export const { enableEditing, disableEditing, clearState } = JobSlice.actions;
