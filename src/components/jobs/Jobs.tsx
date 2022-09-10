import { Box, Button, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedJob } from '../../redux/slices/JobManager.slice';
import { setClientFilters } from '../../redux/slices/Sorting.slice';
import { ReactNode, useEffect, useState } from 'react';
import Job from './Job';
import Content from '../Content';
import Header from '../header';
import SearchBar from '../searchbar';
import JobTable from './JobTable';
import NoSelectedJob from './NoSelectedJob';
import NewJob from './NewJob';
import { getAllClients } from '../../redux/slices/ClientManager.slice';

type SidebarState = 'new' | 'edit';

const Jobs = () => {
    const dispatch = useDispatch();
    const allClients = useSelector(getAllClients);
    const selectedJob = useSelector(getSelectedJob);

    const [sidebarState, setSidebarState] = useState<SidebarState>('edit');

    useEffect(() => {
        dispatch(setClientFilters(Object.keys(allClients)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        setSidebarState('edit');
    }, [selectedJob]);

    const renderSidebarContent = (): ReactNode => {
        if (sidebarState === 'edit') {
            return selectedJob ? <Job job={selectedJob} /> : <NoSelectedJob />;
        }
        return <NewJob handleClose={() => setSidebarState('edit')} />;
    };

    return (
        <Stack maxH="100vh" h="100vh" overflow="hidden" alignItems="center">
            <Header>
                <SearchBar placeholder="Search by name or id..." />
                {sidebarState === 'edit' && (
                    <Button
                        variant="outline"
                        color="white"
                        _hover={{ color: 'blue.600', background: 'white' }}
                        onClick={() => setSidebarState('new')}
                    >
                        New Job
                    </Button>
                )}
            </Header>
            <Content overflowY="auto">
                <Stack direction="row" gap={2} my={5}>
                    <JobTable />
                    <Box maxW="360px" minW="360px" h="full">
                        {renderSidebarContent()}
                    </Box>
                </Stack>
            </Content>
        </Stack>
    );
};

export default Jobs;
