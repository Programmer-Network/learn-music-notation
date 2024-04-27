export interface Props {
  difficulty: "easy" | "medium" | "hard";
}

export const difficultyOptions = [
  {
    label: "Easy",
    value: "easy",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];
