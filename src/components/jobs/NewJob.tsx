import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { Status } from '../../types/JobInfo';
import NoteInfo from '../../types/NoteInfo';
import Notes from '../notes';
import StatusMenu from '../status/StatusMenu';

interface FormValidations {
    title?: string;
}

const NewJob = ({ handleDiscard }: { handleDiscard(): void }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(Status.Scheduled);
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState<NoteInfo[]>([]);
    const [validations, setValidations] = useState<FormValidations>({});

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (validations.title) {
            setValidations({ ...validations, title: undefined });
        }
    };

    const handleChangeStatus = (newStatus: Status) => {
        setStatus(newStatus);
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
        if (title.length === 0) {
            setValidations({ ...validations, title: 'A job title is required' });
        }
    };

    return (
        <Stack px={2} w="full" spacing={4}>
            <FormControl isRequired isInvalid={validations.title !== undefined}>
                <FormLabel>Title</FormLabel>
                <Input
                    variant="flushed"
                    fontSize="2xl"
                    fontWeight="bold"
                    color="blue.600"
                    placeholder="Job Title..."
                    value={title}
                    onChange={handleChangeTitle}
                />
                <FormErrorMessage>{validations.title}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <StatusMenu status={status} handleChange={handleChangeStatus} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Client</FormLabel>
                <StatusMenu status={status} handleChange={handleChangeStatus} />
            </FormControl>
            <FormControl>
                <FormLabel>Job Description</FormLabel>
                <Textarea
                    placeholder="This job must be done by..."
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
            <Stack direction="row" w="full" pt={5}>
                <Button variant="outline" colorScheme="blue" w="full" onClick={handleDiscard}>
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
