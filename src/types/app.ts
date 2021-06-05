export interface Item {
  id: string;
  title: string;
  description: string;
}

export interface Columns {
  [k: string]: {
    title: string;
    items: Item[];
  };
}
