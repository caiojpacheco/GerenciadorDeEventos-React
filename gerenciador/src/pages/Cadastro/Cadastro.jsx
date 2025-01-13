import styles from "./Cadastro.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { cadastrarUsuario } from "../../services/apiService";
import { useToast } from "../../hooks/toast/ToastProvider";

export function Cadastro() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

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

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      nome: "",
      email: "",
      senha: "",
      confirmSenha: "",
      general: "",
    };

    if (formData.nome.trim().length < 3) {
      newErrors.nome = "O nome deve ter pelo menos 3 caracteres";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Digite um email válido";
      isValid = false;
    }

    if (formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

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
      setIsLoading(true);
      try {
        const userData = {
          nome: formData.nome.trim(),
          email: formData.email.trim(),
          senha: formData.senha,
          confirmaSenha: formData.confirmSenha,
        };

        await cadastrarUsuario(userData);

        showToast("Cadastro realizado com sucesso!", "success", 3000);
        setShowSuccess(true);

        setFormData({
          nome: "",
          email: "",
          senha: "",
          confirmSenha: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Erro ao realizar cadastro. Tente novamente.";
        showToast(errorMessage, "error", 3000);
        setShowSuccess(false);

        if (error.response?.status === 409) {
          setErrors((prev) => ({
            ...prev,
            email: "Este email já está cadastrado",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: errorMessage,
          }));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      {showSuccess && (
        <div className={styles.successMessage}>
          <div className={styles.successContent}>
            <h2>Cadastro Realizado com Sucesso!</h2>
            <p>
              Você será redirecionado para a página de login em instantes...
            </p>
          </div>
        </div>
      )}

      <form className={styles.form} onSubmit={handleCadastro}>
        <h1>Cadastro</h1>

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

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <div className={styles.btncadastro}>
          <p>
            Já possui uma conta?{" "}
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
