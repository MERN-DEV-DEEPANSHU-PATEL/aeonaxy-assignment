import { FC, ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: {
    isError: boolean;
    msg: string;
    inputNames: string[];
  };
}

const InputField: FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        onChange={onChange}
        required
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border  ${
          error.inputNames.includes(name) ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      />
    </div>
  );
};

export default InputField;
