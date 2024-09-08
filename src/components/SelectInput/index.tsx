import React from "react";

interface SelectInputProps {
  title: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  options: string[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  title,
  value,
  onChange,
  onBlur,
  placeholder,
  name,
  className,
  options,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-gray-700">{title}</label>
      <select
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className={`px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-primary hover:border-primary transition-colors ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
