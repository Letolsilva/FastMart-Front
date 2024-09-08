import React from "react";
import CurrencyInput from "react-currency-input-field";

interface CurrencyInputProps {
  title: string;
  placeholder: string;
  value?: string;
  onValueChange?: (value: string | undefined, name: string | undefined) => void;
  name?: string;
  className?: string;
}

export const CashInput: React.FC<CurrencyInputProps> = ({
  title,
  placeholder,
  value,
  onValueChange,
  name,
  className,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-gray-700">{title}</label>
      <CurrencyInput
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        decimalsLimit={2}
        className={`px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-primary hover:border-primary transition-colors ${className}`}
        onValueChange={onValueChange}
      />
    </div>
  );
};
