import { FC, ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, name, checked, onChange }) => {
  return (
    <div className="my-6 flex items-center">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
        className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor={name} className="block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
