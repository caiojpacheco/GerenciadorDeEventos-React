import "./App.css";
import { AuthProvider } from "./hooks/authLogin/auth";
import { ToastProvider } from "./hooks/toast/ToastProvider";
import { Rotas } from "./routes/Routes";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <Rotas />
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default App;
