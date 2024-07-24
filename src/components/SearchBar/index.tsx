import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder,
}) => {
  return (
    <div className="flex items-center mb-4 w-full max-w-lg">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={placeholder}
        className="p-2 border-2 border-gray-300 rounded-lg w-full focus:border-purple-800 focus:outline-none focus:ring-1 focus:ring-purple-800"
      />
    </div>
  );
};

export default SearchBar;
