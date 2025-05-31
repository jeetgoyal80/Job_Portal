import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EndPointUserURLJOB } from "@/utils/constant";
import { setjobs } from "@/redux/jobslice";

const useFetchJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const response = await axios.get(`${EndPointUserURLJOB}/getjobs`,{withCredentials:true});
        const jobsData = response.data.jobs || [];
        dispatch(setjobs(jobsData));
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    getAllJobs();
  }, [dispatch]);
};

export default useFetchJobs;
