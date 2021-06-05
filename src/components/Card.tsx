import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  desc: string;
  isDragging: boolean;
}

const Card: React.FunctionComponent<Props> = ({ title, desc, isDragging, ...rest }) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderColor={isDragging ? 'orange.50' : 'orange.700'}
      bg="gray.300"
      {...rest}
    >
      <Heading fontSize="medium">{title}</Heading>
      <Text mt={4} fontSize="small">
        {desc}
      </Text>
    </Box>
  );
};

export { Card };
