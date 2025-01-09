import styles from "./Cadastro.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function Cadastro({ navigateTo }) {
  const navigate = useNavigate();

  const handleNavigationLogin = () => navigate("/");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmSenha: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmSenha: "",
    general: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      nome: "",
      email: "",
      senha: "",
      confirmSenha: "",
      general: "",
    };

    // Validação do nome
    if (formData.nome.trim().length < 3) {
      newErrors.nome = "O nome deve ter pelo menos 3 caracteres";
      isValid = false;
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Digite um email válido";
      isValid = false;
    }

    // Verificar se o email já está cadastrado
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.email === formData.email.trim()) {
      newErrors.email = "Este email já está cadastrado";
      isValid = false;
    }

    // Validação da senha
    if (formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    // Validação da confirmação de senha
    if (formData.senha !== formData.confirmSenha) {
      newErrors.confirmSenha = "As senhas não coincidem";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userData = {
          nome: formData.nome.trim(),
          email: formData.email.trim(),
          senha: formData.senha,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        setFeedbackMessage({
          type: "success",
          text: "Cadastro realizado com sucesso!",
        });

        // Redireciona para a página de login após 3 segundos
        setTimeout(() => {
          setFeedbackMessage(null);
          handleNavigationLogin;
        }, 3000);
      } catch (error) {
        setFeedbackMessage({
          type: "error",
          text: "Erro ao realizar cadastro. Tente novamente.",
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCadastro}>
        <h1>Cadastro</h1>

        {/* Mensagem de feedback */}
        {feedbackMessage && (
          <div
            className={
              feedbackMessage.type === "success"
                ? styles.feedbackSuccess
                : styles.feedbackError
            }
          >
            {feedbackMessage.text}
          </div>
        )}

        {errors.general && (
          <div className={styles.generalError}>{errors.general}</div>
        )}

        <div className={styles.inputfield}>
          <input
            type="text"
            name="nome"
            placeholder="Nome de administrador"
            value={formData.nome}
            onChange={handleChange}
            className={errors.nome ? styles.inputError : ""}
            required
          />
          <FaUser className={styles.icon} />
          {errors.nome && (
            <span className={styles.errorMessage}>{errors.nome}</span>
          )}
        </div>

        <div className={styles.inputfield}>
          <input
            type="email"
            name="email"
            placeholder="Endereço de e-mail"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.inputError : ""}
            required
          />
          <MdEmail className={styles.icon} />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.inputfield}>
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            className={errors.senha ? styles.inputError : ""}
            required
          />
          <FaLock className={styles.icon} />
          {errors.senha && (
            <span className={styles.errorMessage}>{errors.senha}</span>
          )}
        </div>

        <div className={styles.inputfield}>
          <input
            type="password"
            name="confirmSenha"
            placeholder="Confirme a Senha"
            value={formData.confirmSenha}
            onChange={handleChange}
            className={errors.confirmSenha ? styles.inputError : ""}
            required
          />
          <FaLock className={styles.icon} />
          {errors.confirmSenha && (
            <span className={styles.errorMessage}>{errors.confirmSenha}</span>
          )}
        </div>

        <button type="submit">Cadastrar</button>

        <div className={styles.btncadastro}>
          <p>
            Já possui uma conta?
            <button type="button" onClick={handleNavigationLogin}>
              Fazer login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
