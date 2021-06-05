import { DropResult } from 'react-beautiful-dnd';

import { Columns } from '../types/app';

export const getDragResult = (result: DropResult, columns: Columns): Columns | undefined => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId === destination.droppableId) {
    const column = columns[source.droppableId];
    const updatedColItems = [...column.items];
    const [item] = updatedColItems.splice(source.index, 1);
    updatedColItems.splice(destination.index, 0, item);
    return {
      ...columns,
      [source.droppableId]: {
        ...column,
        items: updatedColItems,
      },
    };
  }
  const initialColumn = columns[source.droppableId];
  const finalColumn = columns[destination.droppableId];
  const updatedInitialItems = [...initialColumn.items];
  const destItems = [...finalColumn.items];
  const [item] = updatedInitialItems.splice(source.index, 1);
  destItems.splice(destination.index, 0, item);
  return {
    ...columns,
    [source.droppableId]: {
      ...initialColumn,
      items: updatedInitialItems,
    },
    [destination.droppableId]: {
      ...finalColumn,
      items: destItems,
    },
  };
};
