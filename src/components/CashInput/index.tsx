import React, { useState } from "react";

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

export const CashInput: React.FC<TextInputProps> = ({
  title,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  className,
  type = "text", // Tipo padrão é texto
}) => {
  // Função para formatar o valor como moeda
  const formatToCurrency = (value: string): string => {
    // Remove qualquer caractere não numérico
    const numericValue = value.replace(/\D/g, '');
    // Adiciona a vírgula e formata como moeda
    const formattedValue = numericValue.replace(/(\d)(\d{2})$/, '$1,$2');
    // Adiciona o prefixo de moeda e espaços para separar os milhares
    return `R$ ${formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
  };

  // Estado local para controlar o valor formatado
  const [localValue, setLocalValue] = useState(value || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalValue(newValue);
    // Formata o valor e chama a função onChange, se fornecida
    if (onChange) {
      onChange({
        ...event,
        target: {
          ...event.target,
          value: formatToCurrency(newValue),
        },
      });
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-gray-700">{title}</label>
      <input
        type={type}
        value={localValue}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        className={`px-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-primary hover:border-primary transition-colors ${className}`}
      />
    </div>
  );
};
