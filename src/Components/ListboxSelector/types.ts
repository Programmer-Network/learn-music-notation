import { EDifficulty } from "../../types";

export interface ListBoxProps {
  value: string;
  onChange: (value: EDifficulty) => void;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
}
