import { Box, Heading, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Content from '../Content';

const Header = ({ children }: { children?: ReactNode }) => {
    return (
        <Box w="full" bg="blue.600">
            <Content>
                <Stack direction="row" gap={5} py={3} alignItems="center">
                    <Heading color="white" whiteSpace="nowrap">
                        Tradie Jobs
                    </Heading>
                    {children}
                </Stack>
            </Content>
        </Box>
    );
};

export default Header;
