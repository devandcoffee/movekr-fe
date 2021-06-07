import React, { useCallback, useState } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import { Box, HStack, Stack, Text } from '@chakra-ui/layout';
import { Button, Center, Container, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Card } from '../components/Card';
import { NewCardModal } from '../components/NewCard/NewCardModal';
import { NewProject } from '../components/NewProject/NewProjectModal';
import { columns } from '../data/columns';
import { getDragResult } from '../helpers/getDragResult';

const Board: React.FunctionComponent = () => {
  const [currentColumns, setCurrentColumns] = useState(columns);
  const {
    isOpen: isProjectModalOpen,
    onOpen: onOpenNewProjectModal,
    onClose: onCloseNewProjectModal,
  } = useDisclosure();
  const { isOpen: isCardModalOpen, onOpen: onOpenNewCardModal, onClose: onCloseNewCardModal } = useDisclosure();

  const handleDragEnd = useCallback(
    (result) => {
      const calculatedColumns = getDragResult(result, currentColumns);
      if (!calculatedColumns) return;
      setCurrentColumns(calculatedColumns);
    },
    [currentColumns],
  );

  return (
    <Container>
      <HStack spacing="4" justifyContent="center" mt="4">
        <Text fontSize="3xl">Board Sample</Text>
        <Menu>
          <MenuButton aria-label="add card" as={Button} rightIcon={<AddIcon />}>
            New
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpenNewProjectModal}>New Project</MenuItem>
            <MenuItem onClick={onOpenNewCardModal}>New Card</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Center alignItems="start">
        <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
          {Object.entries(currentColumns).map(([columnId, column], _) => {
            return (
              <Stack key={columnId} m="9" alignItems="center">
                <Text fontSize="2xl">{column.title}</Text>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        padding={4}
                        width={300}
                        minHeight={500}
                        bg={snapshot.isDraggingOver ? 'orange.100' : 'orange.200'}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <Box
                                    p={4}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Card title={item.title} desc={item.description} isDragging={snapshot.isDragging} />
                                  </Box>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </Box>
                    );
                  }}
                </Droppable>
              </Stack>
            );
          })}
        </DragDropContext>
      </Center>
      <NewProject isOpen={isProjectModalOpen} onClose={onCloseNewProjectModal} />
      <NewCardModal isOpen={isCardModalOpen} onClose={onCloseNewCardModal} />
    </Container>
  );
};

export { Board };
