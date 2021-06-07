import React, { useCallback } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import { NewCardForm } from './NewCard';
import { CardFormValues } from './types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewCardModal: React.FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const form = useForm<CardFormValues>({
    defaultValues: {
      cardName: '',
    },
  });

  const handleSubmit = useCallback(
    (data: CardFormValues) => {
      onClose();
    },
    [onClose],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ModalHeader>New Card</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <NewCardForm />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose} variant="ghost" colorScheme="orange">
                Close
              </Button>
              <Button type="submit" colorScheme="orange">
                OK
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export { NewCardModal };
