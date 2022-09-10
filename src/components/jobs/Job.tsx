import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, deleteNote, updateNote, updateStatus } from '../../redux/slices/JobManager.slice';
import JobInfo, { Status } from '../../types/JobInfo';
import NoteInfo from '../../types/NoteInfo';
import Notes from '../notes';
import StatusMenu from '../status/StatusMenu';

const Job = ({ job }: { job: JobInfo }) => {
    const dispatch = useDispatch();

    const handleSaveNewNote = (newNote: NoteInfo) => {
        dispatch(addNote(newNote));
    };

    const handleUpdateNote = (noteIndex: number, newMessage: string) => {
        dispatch(updateNote({ noteIndex, newMessage }));
    };

    const handleDeleteNote = (noteIndex: number) => {
        dispatch(deleteNote(noteIndex));
    };

    const handleChangeStatus = (newStatus: Status) => {
        dispatch(updateStatus(newStatus));
    };

    const renderContactInfo = (icon: ReactNode, label: string): ReactNode => {
        return (
            <Stack direction="row" alignItems="center">
                {icon}, <Text>{label}</Text>
            </Stack>
        );
    };

    return (
        <Stack px={2} w="full" spacing={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2}>
                <Stack spacing={1}>
                    <Text fontSize="2xl" lineHeight={1} fontWeight="bold" color="blue.600">
                        {job.name}
                    </Text>
                    <Text fontWeight="semibold" color="gray.600">
                        {job.id}
                    </Text>
                </Stack>
                <StatusMenu status={job.status} handleChange={handleChangeStatus} />
            </Stack>
            <Text>
                {new Date(job.created).toLocaleDateString(undefined, {
                    hour: 'numeric',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}
            </Text>
            <Stack spacing={0}>
                <Text fontWeight="semibold">{job.client.name}</Text>
                {job.client.phone && renderContactInfo(<PhoneIcon />, job.client.phone)}
                {job.client.email && renderContactInfo(<EmailIcon />, job.client.email)}
            </Stack>
            {job.description && <Text>{job.description}</Text>}
            <Notes
                notes={job.notes}
                handleSave={handleSaveNewNote}
                handleUpdate={handleUpdateNote}
                handleDelete={handleDeleteNote}
            />
        </Stack>
    );
};

export default Job;
