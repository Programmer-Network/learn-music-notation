export interface ListBoxProps {
  value: string;
  onChange: (value: any) => void;
  buttonTitle: string;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
}
