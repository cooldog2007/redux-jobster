import { FaWpforms } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
export const links = [
  { name: "stats", url: "/", icon: <IoBarChartSharp className="icon" /> },
  {
    name: "all jobs",
    url: "/all-jobs",
    icon: <MdQueryStats className="icon" />,
  },
  { name: "add job", url: "/add-job", icon: <FaWpforms className="icon" /> },
  { name: "profile", url: "/profile", icon: <ImProfile className="icon" /> },
];
