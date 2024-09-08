import React from "react";

interface NumberInputProps {
  title: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  title,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  className,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-gray-700">{title}</label>
      <input
        type="number"
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        className={`px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-primary hover:border-primary transition-colors ${className}`}
        min="0"
        step="any"
      />
    </div>
  );
};
