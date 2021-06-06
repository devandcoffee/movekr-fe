import React from 'react';

import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { FormControl, FormLabel, HStack, IconButton, VStack } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ProjectFormValues } from './types';

const NewProjectForm: React.FunctionComponent = () => {
  const { control, register } = useFormContext<ProjectFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  return (
    <VStack spacing="6">
      <FormControl>
        <FormLabel>Project Name</FormLabel>
        <Input id="projectName" placeholder="Project Name" {...register('projectName')} />
      </FormControl>
      <FormControl>
        <FormLabel>Columns</FormLabel>
        {fields.map((field, index) => (
          <HStack key={field.id} mt="3">
            <Input
              id="projectName"
              placeholder="Colum Name"
              {...register(`columns.${index}.name` as `columns.${number}.name`)}
            />
            <IconButton aria-label="add-column" icon={<AddIcon />} onClick={() => append({ name: '' })} />
            {index > 0 && <IconButton aria-label="remove-column" icon={<DeleteIcon />} onClick={() => remove(index)} />}
          </HStack>
        ))}
      </FormControl>
    </VStack>
  );
};

export { NewProjectForm };
