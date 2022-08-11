declare type TSelect = {
  id: number | "";
  label: string;
  unique_key?: string | number;
  // react-select
  value?: string;
}

declare type TReactSelect = {
  label: string;
  value: string;
}