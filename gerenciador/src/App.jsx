import "./App.css";
import { Rotas } from "./routes/Routes";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </>
  );
}

export default App;
