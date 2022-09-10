import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Jobs from './components/jobs/Jobs';
import { clients } from './data/DataPopulator';
import { addAllClients } from './redux/slices/ClientManager.slice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addAllClients(clients));
    }, [dispatch]);

    return <ChakraProvider>{<Jobs />}</ChakraProvider>;
};

export default App;
