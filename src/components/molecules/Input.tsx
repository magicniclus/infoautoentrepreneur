interface InputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Typage précis pour l'événement onChange
  type?: string;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
}) => {
  return (
    <input
      name={name}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`w-full border px-2 py-1 rounded-md border-slate-400 mt-2 ${className}`}
    />
  );
};

export default Input;
