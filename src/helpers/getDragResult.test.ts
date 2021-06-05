import faker from 'faker';
import { DropResult } from 'react-beautiful-dnd';

import { Columns, Item } from '../types/app';
import { getDragResult } from './getDragResult';

type DefaultDropResultProps = Pick<DropResult, 'mode' | 'reason' | 'type'>;
const defaultDropResultSettings: DefaultDropResultProps = {
  mode: 'FLUID',
  reason: 'DROP',
  type: 'DEFAULT',
};

describe('src/helpers/getDragResult', () => {
  it('returns undefined when there is no destination', () => {
    const noDestinationResult: DropResult = {
      ...defaultDropResultSettings,
      draggableId: faker.datatype.uuid(),
      source: {
        index: faker.datatype.number(),
        droppableId: faker.datatype.uuid(),
      },
    };
    const result = getDragResult(noDestinationResult, {});
    expect(result).toBe(undefined);
  });

  it('moves an intem from column X to column Y when the destination is different from the source', () => {
    const initialItems: Item[] = [
      { id: faker.datatype.uuid(), title: faker.random.word(), description: faker.random.word() },
    ];
    const columns: Columns = {
      'column-X': {
        title: 'X',
        items: initialItems,
      },
      'column-Y': {
        title: 'Y',
        items: [],
      },
    };
    const distinctSourceDestination: DropResult = {
      ...defaultDropResultSettings,
      draggableId: faker.datatype.uuid(),
      source: {
        index: 0,
        droppableId: 'column-X',
      },
      destination: {
        index: 0,
        droppableId: 'column-Y',
      },
    };

    const expectedResult: Columns = {
      'column-X': {
        title: 'X',
        items: [],
      },
      'column-Y': {
        title: 'Y',
        items: initialItems,
      },
    };

    const result = getDragResult(distinctSourceDestination, columns);
    expect(result).toEqual(expectedResult);
  });

  it('moves an item in the same column X when the destination and the source are the same but the index changes', () => {
    const initialItems: Item[] = [
      { id: faker.datatype.uuid(), title: faker.random.word(), description: faker.random.word() },
      { id: faker.datatype.uuid(), title: faker.random.word(), description: faker.random.word() },
      { id: faker.datatype.uuid(), title: faker.random.word(), description: faker.random.word() },
    ];
    const columns: Columns = {
      'column-X': {
        title: 'X',
        items: initialItems,
      },
    };
    const distinctSourceDestination: DropResult = {
      ...defaultDropResultSettings,
      draggableId: faker.datatype.uuid(),
      source: {
        index: 0,
        droppableId: 'column-X',
      },
      destination: {
        index: 1,
        droppableId: 'column-X',
      },
    };

    const expectedResult: Columns = {
      'column-X': {
        title: 'X',
        items: [initialItems[1], initialItems[0], initialItems[2]],
      },
    };

    const result = getDragResult(distinctSourceDestination, columns);

    expect(result).toEqual(expectedResult);
  });
});
