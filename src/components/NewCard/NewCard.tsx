import React from 'react';

import { Input } from '@chakra-ui/input';
import { FormControl, FormLabel, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { CardFormValues } from './types';

const NewCardForm: React.FunctionComponent = () => {
  const { register } = useFormContext<CardFormValues>();

  return (
    <VStack spacing="6">
      <FormControl>
        <FormLabel>Card Name</FormLabel>
        <Input id="cardName" placeholder="Card Name" {...register('cardName')} />
      </FormControl>
    </VStack>
  );
};

export { NewCardForm };
