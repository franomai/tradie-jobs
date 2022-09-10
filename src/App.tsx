import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Jobs from './components/jobs/Jobs';
import { clients } from './data/DataPopulator';
import { addAllClients } from './redux/slices/ClientManager.slice';
import { generateRandomJobs, getAllJobs } from './redux/slices/JobManager.slice';

const App = () => {
    const dispatch = useDispatch();

    const allJobs = useSelector(getAllJobs);

    useEffect(() => {
        const jobs = Object.keys(allJobs);
        if (jobs.length === 0) {
            dispatch(addAllClients(clients));
            dispatch(generateRandomJobs(10));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return <ChakraProvider>{Object.keys(allJobs).length !== 0 && <Jobs allJobs={allJobs} />}</ChakraProvider>;
};

export default App;
