# Gerenciador de Eventos - Frontend

## Visão Geral
Este é o frontend do Gerenciador de Eventos, desenvolvido utilizando React e React Native. Ele fornece uma interface amigável para os administradores gerenciarem eventos de forma eficiente.

## Funcionalidades

### Tela de Login
- Campos: Email do Administrador, Senha.
- Opção "Gravar Senha" para acesso rápido em logins futuros.
- Botões: Entrar e Cadastrar-se.

### Tela de Cadastro de Administrador
- Campos: Nome do Administrador, Email, Senha e Confirmar Senha.
- Validação de coincidência entre os campos de senha.
- Mensagem de sucesso ao concluir o cadastro.

### Tela Home de Eventos
- Lista de eventos cadastrados com:
  - Imagem
  - Título
  - Data
  - Localização
- Funções:
  - Editar data e localização.
  - Excluir evento.
- Botão "Adicionar Evento" que abre um modal com:
  - Campos: Nome do Evento, Data, Localização, Imagem.
  - Botão para salvar.

## Tecnologias Utilizadas
- **React**: Construção da interface web.
- **React Native**: Construção da interface móvel.
- **Axios**: Consumo da API backend.
- **React Router**: Gerenciamento de rotas.
- **Styled Components**: Estilização dos componentes.

## Configuração do Projeto

### Pré-requisitos
- Node.js 16 ou superior.
- npm ou yarn.
