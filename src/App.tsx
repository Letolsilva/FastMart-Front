import { AppRouter } from "./routes/routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <div className="App">
      <ToastContainer closeOnClick autoClose={1500} limit={1}/>
      <AppRouter />
    </div>
  );
}
