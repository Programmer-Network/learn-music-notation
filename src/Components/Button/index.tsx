import { FC } from "react";

const Button: FC<{
  onClick?: () => void;
  bgFill?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, children, bgFill, className }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`p-4 border-2 border-yellow ${
        bgFill ? "bg-primary text-black hover:bg-yellow-300" : "text-primary"
      } rounded-md uppercase font-bold font-mono border-primary hover:bg-primary hover:text-black transition-colors duration-300 ease-in-out ${className}`}
    >
      <div className="flex items-center gap-1">{children}</div>
    </button>
  );
};

export default Button;
