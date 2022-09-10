import NoteInfo from '../../types/NoteInfo';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Editable,
    EditablePreview,
    EditableTextarea,
    Flex,
    IconButton,
    Stack,
    useEditableControls,
} from '@chakra-ui/react';
import { useState } from 'react';

const Note = ({
    index,
    note,
    handleUpdate,
    handleDelete,
}: {
    index: number;
    note: NoteInfo;
    handleUpdate(noteIndex: number, newMessage: string): void;
    handleDelete(noteIndex: number): void;
}) => {
    const [newValue, setNewValue] = useState(note.message);

    return (
        <Editable
            defaultValue={newValue}
            isPreviewFocusable={false}
            onChange={(value) => setNewValue(value)}
            onSubmit={(newMessage) => handleUpdate(index, newMessage)}
        >
            <Stack direction="row" justifyContent="space-between">
                <EditablePreview
                    borderColor="gray.400"
                    borderLeftWidth={4}
                    pl={3}
                    py={1}
                    borderRadius="none"
                    whiteSpace="pre-wrap"
                />
                <EditableTextarea px={2} />
                <EditableControls canSave={newValue.trim().length !== 0} handleDelete={() => handleDelete(index)} />
            </Stack>
        </Editable>
    );
};

const EditableControls = ({ canSave, handleDelete }: { canSave: boolean; handleDelete(): void }) => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
        <Stack direction="column" justifyContent="center" px={0.5}>
            {canSave && (
                <IconButton
                    variant="ghost"
                    title="Save changes"
                    aria-label="Save changes"
                    icon={<CheckIcon />}
                    size="xs"
                    {...getSubmitButtonProps()}
                />
            )}
            <IconButton
                variant="ghost"
                title="Discard changes"
                aria-label="Discard changes"
                icon={<CloseIcon />}
                size="xs"
                {...getCancelButtonProps()}
            />
            <IconButton
                variant="ghost"
                title="Delete note"
                aria-label="Delete note"
                icon={<DeleteIcon />}
                size="xs"
                {...getSubmitButtonProps()}
                onClick={handleDelete}
            />
        </Stack>
    ) : (
        <Flex justifyContent="center">
            <IconButton
                variant="ghost"
                title="Edit note"
                aria-label="Edit note"
                size="sm"
                icon={<EditIcon />}
                {...getEditButtonProps()}
            />
        </Flex>
    );
};

export default Note;
