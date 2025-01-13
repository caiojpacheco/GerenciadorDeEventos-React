import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/authLogin/auth";
import styles from "./Login.module.css";

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const data = { email, senha };

    try {
      await signIn(data);
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            setError("Email não cadastrado");
            break;
          case 401:
            setError("Senha incorreta");
            break;
          case 400:
            setError("Por favor, preencha todos os campos");
            break;
          default:
            setError("Erro ao fazer login. Tente novamente.");
        }
      } else {
        setError("Erro de conexão. Verifique sua internet.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignIn} className={styles.form}>
        <h1>Login</h1>

        {error && <div className={styles.feedbackError}>{error}</div>}

        <div className={styles.inputfield}>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className={error ? styles.inputError : ""}
            required
          />
        </div>

        <div className={styles.inputfield}>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              setError("");
            }}
            className={error ? styles.inputError : ""}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        <div className={styles.btncadastro}>
          <p>
            Não tem uma conta?{" "}
            <a href="/cadastro" className={styles.register}>
              Cadastrar-se
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
