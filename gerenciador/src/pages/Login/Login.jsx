import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    senha: "",
    general: "",
  });
  const navigate = useNavigate();

  const handleNavigationCadastro = () => navigate("/cadastro");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      senha: "",
      general: "",
    };

    // Limpa os espaços em branco
    const espacoEmail = email.trim();
    const espacoSenha = senha.trim();

    // Validação de email vazio
    if (!espacoEmail) {
      newErrors.email = "O email é obrigatório";
      isValid = false;
    }

    // Validação de senha vazia
    if (!espacoSenha) {
      newErrors.senha = "A senha é obrigatória";
      isValid = false;
    }

    // Busca dados do usuário no localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    // Verifica se existe algum usuário cadastrado
    if (!storedUserData) {
      newErrors.general = "Nenhum usuário cadastrado";
      isValid = false;
    } else if (espacoEmail && espacoSenha) {
      // Só verifica se ambos foram preenchidos
      // Verifica email
      if (storedUserData.email !== espacoEmail) {
        newErrors.email = "Email não cadastrado";
        isValid = false;
      }
      // Verifica senha apenas se o email estiver correto
      else if (storedUserData.senha !== espacoSenha) {
        newErrors.senha = "Senha incorreta";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Login bem sucedido
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ email: email.trim() })
      );
      navigate("/home");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1>Login</h1>

        <div className={styles.inputfield}>
          <input
            type="email"
            value={email}
            placeholder="Email do administrador"
            onChange={(e) => {
              setEmail(e.target.value);
              // Limpa o erro quando o usuário começa a digitar
              setErrors((prev) => ({ ...prev, email: "", general: "" }));
            }}
            className={errors.email ? styles.inputError : ""}
          />
          <FaUser className={styles.icon} />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.inputfield}>
          <input
            type="password"
            value={senha}
            placeholder="Senha"
            onChange={(e) => {
              setSenha(e.target.value);
              // Limpa o erro quando o usuário começa a digitar
              setErrors((prev) => ({ ...prev, senha: "", general: "" }));
            }}
            className={errors.senha ? styles.inputError : ""}
          />
          <FaLock className={styles.icon} />
          {errors.senha && (
            <span className={styles.errorMessage}>{errors.senha}</span>
          )}
        </div>

        {errors.general && (
          <div className={styles.generalError}>{errors.general}</div>
        )}

        <div className={styles.recallforget}>
          <label>
            <input type="checkbox" />
            Lembrar de mim
          </label>
        </div>

        <button type="submit">Entrar</button>

        <div className={styles.btncadastro}>
          <p>
            Não tem uma conta?
            <button type="button" onClick={handleNavigationCadastro}>
              Cadastrar
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
