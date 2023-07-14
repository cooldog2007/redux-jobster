import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/UserSlice";
import jobSlice from "./features/job/JobSlice";
import AllJobsSlice from "./features/allJobs/AllJobsSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: AllJobsSlice,
  },
});
