import moment from "moment/moment";

export const fomatDate = (dateUTC) => {
  return moment(dateUTC).format("MMM Do, YYYY");
};
