import { setSingleJob } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useUpdateJobById = (jobId, updatedJobData) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const updateJob = async () => {
            try {
                const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, updatedJobData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                console.log(res.data.job);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job)); // Update the Redux store with the updated job
                }
            } catch (error) {
                console.log(error.response ? error.response.data : error.message);
            }
        };

        if (jobId && updatedJobData) {
            updateJob();
        }
    }, [jobId, updatedJobData, dispatch]);
};

export default useUpdateJobById;
