import { setAllAppliedJobs } from "../redux/jobSlice";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                 // Sending GET request to fetch applied jobs
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                console.log(res.data);   // Logs the response data to check if it's correct
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;