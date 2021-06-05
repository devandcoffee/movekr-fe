import { v4 as uuid } from 'uuid';

import { Columns } from '../types/app';
import { items } from './items';

export const columns: Columns = {
  [uuid()]: {
    title: 'To do',
    items: items,
  },
  [uuid()]: {
    title: 'In Progress',
    items: [],
  },
  [uuid()]: {
    title: 'Done',
    items: [],
  },
};
