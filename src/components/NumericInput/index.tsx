import React from "react";
import { NumericFormat } from "react-number-format";

interface NumericInputProps {
  title: string;
  placeholder: string;
  value: string | number;
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
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-gray-700">{title}</label>
      <NumericFormat
        className={`px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-primary hover:border-primary transition-colors ${className}`}
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
