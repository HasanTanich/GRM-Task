interface InputProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, value, onChange, name }: InputProps) => {
  return (
    <div className="flex items-center justify-between w-[250px] gap-8">
      <label
        htmlFor={label}
        aria-label={label}
        className="px-2 py-2 border rounded w-[60%] flex-grow sm:w-[60%]"
      >
        {label}
      </label>
      <input
        type="number"
        value={value}
        id={label}
        name={name}
        onChange={onChange}
        className="w-[30%] px-2 py-2 border rounded border-slate-400 sm:w-[30%]"
      />
    </div>
  );
};

export default Input;
