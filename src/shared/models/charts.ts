interface DateOptions {
  format?: string;
}

export interface DateValue {
  type: 'date';
  label: string;
  options: DateOptions;
}

export interface NumberValue {
  type: 'number';
  label: string;
  options: unknown;
}

export interface StringValue {
  type: 'string';
  label: string;
  options: unknown;
}

export interface BooleanValue {
  type: 'boolean';
  label: string;
  options: unknown;
}

interface ChartMeta {
  [key: string]: DateValue | NumberValue | StringValue | BooleanValue;
}

export interface ChartDetails {
  title: string;
  meta: ChartMeta;
  data: Array<Record<string, unknown>>;
}
