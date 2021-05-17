import AppRouter from "./approuter/AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
