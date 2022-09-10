import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClients } from '../../redux/slices/ClientManager.slice';
import { addJob } from '../../redux/slices/JobManager.slice';
import { Status } from '../../types/JobInfo';
import NoteInfo from '../../types/NoteInfo';
import Notes from '../notes';
import StatusMenu from '../status/StatusMenu';

interface FormValidations {
    name?: string;
    client?: string;
}

const NewJob = ({ closeNewJob }: { closeNewJob(): void }) => {
    const dispatch = useDispatch();
    const allClients = useSelector(getAllClients);

    const [name, setName] = useState('');
    const [status, setStatus] = useState(Status.Scheduled);
    const [client, setClient] = useState<string>('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState<NoteInfo[]>([]);
    const [validations, setValidations] = useState<FormValidations>({});

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (validations.name) {
            setValidations({ ...validations, name: undefined });
        }
    };

    const handleChangeStatus = (newStatus: Status) => {
        setStatus(newStatus);
    };

    const handleChangeClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setClient(e.target.value);
        if (validations.client && allClients[e.target.value] !== undefined) {
            setValidations({ ...validations, client: undefined });
        }
    };

    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleSaveNote = (newNote: NoteInfo) => {
        setNotes([newNote, ...notes]);
    };

    const handleUpdateNote = (noteIndex: number, newMessage: string) => {
        setNotes(notes.map((note, index) => (index === noteIndex ? { ...note, message: newMessage } : note)));
    };

    const handleDeleteNote = (noteIndex: number) => {
        notes.splice(noteIndex, 1);
        setNotes([...notes]);
    };

    const handleSave = () => {
        let isValid = true;
        const validations: FormValidations = {};
        if (name.length === 0) {
            validations.name = 'A job title is required';
            isValid = false;
        }
        if (allClients[client] === undefined) {
            validations.client = 'You must select a client';
            isValid = false;
        }

        if (isValid) {
            dispatch(addJob({ name, status, client: allClients[client], description, notes }));
        } else {
            setValidations(validations);
        }
    };

    return (
        <Stack px={2} w="full" spacing={4}>
            <FormControl isRequired isInvalid={validations.name !== undefined}>
                <Stack>
                    <FormLabel>Name</FormLabel>
                </Stack>
                <Input
                    variant="flushed"
                    fontSize="2xl"
                    fontWeight="bold"
                    color="blue.600"
                    placeholder="Job Name..."
                    value={name}
                    onChange={handleChangeName}
                />
                <FormErrorMessage>{validations.name}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <StatusMenu status={status} handleChange={handleChangeStatus} />
            </FormControl>
            <FormControl isRequired isInvalid={validations.client !== undefined}>
                <FormLabel>Client</FormLabel>
                <Select value={client} placeholder="Select client..." onChange={handleChangeClient}>
                    {Object.values(allClients).map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>{validations.client}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>Job Description</FormLabel>
                <Textarea
                    placeholder="Add some more information about the job here..."
                    value={description}
                    onChange={handleChangeDescription}
                />
            </FormControl>
            <Notes
                notes={notes}
                handleSave={handleSaveNote}
                handleUpdate={handleUpdateNote}
                handleDelete={handleDeleteNote}
            />
            <Stack direction="row" w="full">
                <Button variant="outline" colorScheme="blue" w="full" onClick={closeNewJob}>
                    Discard
                </Button>
                <Button type="submit" colorScheme="blue" w="full" onClick={handleSave}>
                    Save
                </Button>
            </Stack>
        </Stack>
    );
};

export default NewJob;
