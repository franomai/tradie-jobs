import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Status } from '../../types/JobInfo';
import StatusMenu from '../status/StatusMenu';

const NewJob = ({ handleDiscard }: { handleDiscard(): void }) => {
    const [status, setStatus] = useState(Status.Scheduled);

    const handleChangeStatus = (newStatus: Status) => {
        setStatus(newStatus);
    };

    return (
        <Stack px={2} w="full" spacing={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2}>
                <Input
                    variant="flushed"
                    fontSize="2xl"
                    fontWeight="bold"
                    color="blue.600"
                    isRequired
                    placeholder="Job Title..."
                />
                <IconButton
                    variant="ghost"
                    title="Discard new job"
                    aria-label="Discard new job"
                    icon={<CloseIcon />}
                    onClick={handleDiscard}
                />
            </Stack>
            <StatusMenu status={status} handleChange={handleChangeStatus} />
        </Stack>
    );
};

export default NewJob;
