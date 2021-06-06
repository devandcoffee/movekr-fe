import { NestedValue } from 'react-hook-form';

interface Column {
  name: string;
}

export interface ProjectFormValues {
  projectName: string;
  columns: NestedValue<Column[]>;
}
