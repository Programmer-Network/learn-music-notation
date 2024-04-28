import { FC } from "react";

const Button: FC<{
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="p-4 border-2 border-yellow-500 text-yellow-500 rounded-md uppercase font-bold font-mono hover:bg-yellow-500 hover:text-black transition-colors duration-300 ease-in-out"
    >
      <div className="flex items-center gap-1">{children}</div>
    </button>
  );
};

export default Button;
