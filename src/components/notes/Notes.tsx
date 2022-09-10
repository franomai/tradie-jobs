import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, IconButton, Stack, Text, Textarea } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import NoteInfo from '../../types/NoteInfo';
import Note from './Note';

const Notes = ({
    notes,
    handleSave,
    handleUpdate,
    handleDelete,
}: {
    notes: NoteInfo[];
    handleSave(newNote: NoteInfo): void;
    handleUpdate(noteIndex: number, newMessage: string): void;
    handleDelete(noteIndex: number): void;
}) => {
    const [newNote, setNewNote] = useState<string | null>(null);

    useEffect(() => {
        // When the notes change (I.e. Another job was selected) clear the current note
        setNewNote(null);
    }, [notes]);

    const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewNote(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Shortcut for discarding new note
        if (e.key === 'Escape') {
            setNewNote(null);
        }
    };

    const renderNotes = (): ReactNode => {
        return notes.map((note, index) => (
            <Note
                key={note.created}
                index={index}
                note={note}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
        ));
    };

    const handleSaveNewNote = () => {
        handleSave({ message: newNote!.trim(), created: new Date().getTime() });
    };

    const renderNoteButtons = (): ReactNode => {
        return newNote === null ? (
            <IconButton
                variant="ghost"
                title="Add new note"
                aria-label="Add new note"
                icon={<AddIcon />}
                size="sm"
                onClick={() => setNewNote('')}
            />
        ) : (
            <Box>
                {newNote.trim().length !== 0 && (
                    <IconButton
                        variant="ghost"
                        title="Save new note"
                        aria-label="Save new note"
                        icon={<CheckIcon />}
                        size="sm"
                        onClick={handleSaveNewNote}
                    />
                )}
                <IconButton
                    variant="ghost"
                    title="Discard new note"
                    aria-label="Discard new note"
                    icon={<CloseIcon />}
                    size="sm"
                    onClick={() => setNewNote(null)}
                />
            </Box>
        );
    };

    return (
        <Stack w="full" spacing={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">
                    Notes
                </Text>
                {renderNoteButtons()}
            </Stack>
            {newNote !== null && (
                <Textarea
                    placeholder="Enter note here..."
                    value={newNote}
                    onChange={handleChangeMessage}
                    onKeyDown={handleKeyPress}
                />
            )}
            <Stack>{renderNotes()}</Stack>
        </Stack>
    );
};

export default Notes;
