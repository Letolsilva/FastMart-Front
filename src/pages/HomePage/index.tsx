import { getFunction } from "../../services/APIservices";

export function Home() {
  function getFunctionClick() {
    getFunction()
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }
  return (
    <div className="text-black  p-4">
      <button
        className="bg-red-500 text-white border-2 border-red-500 rounded-lg px-6 py-3 text-lg font-semibold transition duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105"
        onClick={getFunctionClick}
      >
        Get function
      </button>
      <p>HOME PAGE</p>
    </div>
  );
}
