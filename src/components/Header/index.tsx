export const Header = () => {
  return (
    <header className="relative z-50 bg-white border-b border-gray-300 shadow-lg p-4 flex items-center">
      <img
        src="public/purple-icon.png"
        className="w-12 h-10"
        alt="Purple Icon"
      />
      <strong className="text-2xl font-bold ml-5 text-secondary">
        FastMart
      </strong>
      <button className="ml-auto text-right text-white border border-secondary-300 rounded-full p-4 w-20 h-12 flex justify-center items-center bg-secondary hover:bg-primary">
        Sair
      </button>
    </header>
  );
};
