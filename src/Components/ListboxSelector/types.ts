import { EDifficulty } from "../../types";

export interface ListBoxProps {
  value: string;
  onChange: (value: EDifficulty) => void;
  buttonTitle: string;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
}
