import React from "react";

interface TextInputProps {
  title: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  type?: string;
}

export const NumberInput: React.FC<TextInputProps> = ({
  title,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  className,
  type = "text", // Tipo padrão é texto
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = event.charCode;
    // Apenas permite a digitação de números (0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-gray-700">{title}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        className={`px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-primary hover:border-primary transition-colors ${className}`}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};