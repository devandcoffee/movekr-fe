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

import { NewProjectForm } from './NewProjectForm';
import { ProjectFormValues } from './types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewProject: React.FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      projectName: '',
      columns: [{ name: '' }],
    },
  });

  const handleSubmit = useCallback(
    (data: ProjectFormValues) => {
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
            <ModalHeader>New Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <NewProjectForm />
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

export { NewProject };
