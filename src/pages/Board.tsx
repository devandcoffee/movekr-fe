import React, { useCallback, useState } from 'react';

import { Box, Stack, Text } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Card } from '../components/Card';
import { columns } from '../data/columns';
import { getDragResult } from '../helpers/getDragResult';

const Board: React.FunctionComponent = () => {
  const [currentColumns, setCurrentColumns] = useState(columns);

  const handleDragEnd = useCallback(
    (result) => {
      const calculatedColumns = getDragResult(result, currentColumns);
      if (!calculatedColumns) return;
      setCurrentColumns(calculatedColumns);
    },
    [currentColumns],
  );

  return (
    <Container display="flex" maxW="xl" maxH="100%" justifyContent="center">
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
    </Container>
  );
};

export { Board };
