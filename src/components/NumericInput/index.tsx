import React from "react";
import { NumericFormat } from "react-number-format";

interface NumericInputProps {
  title: string;
  placeholder: string;
  value: string;
  name: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const NumericInput: React.FC<NumericInputProps> = ({
  title,
  placeholder,
  value,

  onValueChange,
  className,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <NumericFormat
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
        placeholder={placeholder}
        value={value}
        onValueChange={(values) => onValueChange(values.value)}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        prefix="R$"
        fixedDecimalScale
      />
    </div>
  );
};

export default NumericInput;
